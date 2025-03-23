import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";
import fs from "fs/promises";

export interface DirectoryState {
  files: Record<string, boolean>;
}

const initialState: DirectoryState = {
  files: {},
};

export const scanDirectory = createAsyncThunk<
  Record<string, boolean>,
  void,
  { state: RootState; rejectValue: string }
>(
  "directory/scan",
  async (
    _,
    { getState, rejectWithValue }
  ): Promise<Record<string, boolean>> => {
    const directoryPath = process.env.DIRECTORY_PATH || "/";
    const currentFiles: Record<string, boolean> = getState().directory.files;

    const scannedFilenames = (await fs.readdir(directoryPath)).filter(
      (filename) => filename.includes(".")
    );

    const files = { ...currentFiles };

    scannedFilenames.forEach((fileName) => {
      if (files[fileName] === false || !files[fileName]) {
        files[fileName] = true;
      }
    });

    Object.keys(files).forEach((fileName) => {
      if (!scannedFilenames.includes(fileName)) {
        files[fileName] = false;
      }
    });

    return files;
  }
);

export const directorySlice = createSlice({
  name: "directory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(scanDirectory.fulfilled, (state, action) => {
      state.files = action.payload;
    });
    builder.addCase(scanDirectory.rejected, (_, action) => {
      // TODO: Implement error logging
      console.log(action.error.message);
    });
  },
});

export default directorySlice.reducer;
