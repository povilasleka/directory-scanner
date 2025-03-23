import { configureStore } from "@reduxjs/toolkit";
import { directorySlice, scanDirectory } from "./directory-slice";
import fs from "fs/promises";
import { Store } from "store";

jest.mock("fs/promises");

function mockFsReaddir(files: string[]) {
  (fs.readdir as jest.Mock).mockResolvedValue(files);
}

describe("Directory slice state test", () => {
  let store: Store;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        directory: directorySlice.reducer,
      },
    });
  });

  it("has empty initial state", () => {
    const state = store.getState().directory;
    expect(state).toEqual({ files: {} });
  });

  it("correctly updates state after scan", async () => {
    mockFsReaddir(["file1.txt", "file2.txt"]);

    await store.dispatch(scanDirectory());
    const state = store.getState().directory;

    expect(state.files).toEqual({
      "file1.txt": true,
      "file2.txt": true,
    });
  });

  it("marks files as inactive if they were removed from the directory", async () => {
    mockFsReaddir(["file1.txt", "file2.txt"]);

    await store.dispatch(scanDirectory());

    expect(store.getState().directory.files).toEqual({
      "file1.txt": true,
      "file2.txt": true,
    });

    mockFsReaddir(["file3.txt"]);
    await store.dispatch(scanDirectory());

    expect(store.getState().directory.files).toEqual({
      "file1.txt": false,
      "file2.txt": false,
      "file3.txt": true,
    });
  });
});
