import { configureStore } from "@reduxjs/toolkit";
import { directorySlice } from "./features/directory-scan";

export const store = configureStore({
  reducer: {
    directory: directorySlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type Store = typeof store;
