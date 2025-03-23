import { GetDirectoryFilesResponse } from "./types";

export const createDirectoryFilesListResponse = (
  files: Record<string, boolean>
): GetDirectoryFilesResponse =>
  Object.keys(files).map((fileName) => ({
    name: fileName,
    active: files[fileName],
  }));
