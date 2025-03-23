import { scanDirectory } from "./directory-slice";
import { Request, Response } from "express";
import { Store } from "store";
import express, { Router } from "express";
import { createDirectoryFilesListResponse } from "./helpers";
import { GetDirectoryFilesResponse } from "./types";

export const initDirectoryScanRouter = (store: Store): Router => {
  const router = express.Router();

  router.get(
    "/list",
    (req: Request, res: Response<GetDirectoryFilesResponse>) => {
      const files: Record<string, boolean> = store.getState().directory.files;
      res.status(200).json(createDirectoryFilesListResponse(files));
    }
  );

  router.get("/download-state", (req: Request, res: Response<string>) => {
    const files = store.getState().directory.files;
    const response = JSON.stringify(
      createDirectoryFilesListResponse(files),
      null,
      2
    );

    res.setHeader("Content-Disposition", 'attachment; filename="data.json"');
    res.setHeader("Content-Type", "application/json");

    res.status(200).send(response);
  });

  // TODO: Make this a POST request
  router.get("/scan", (req: Request, res: Response) => {
    store.dispatch(scanDirectory());
    res.status(200).json({
      message: "Scan has been started",
    });
  });

  return router;
};
