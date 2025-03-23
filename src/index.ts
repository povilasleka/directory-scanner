import express from "express";
import dotenv from "dotenv";
import { store, Store } from "./store";
import { initDirectoryScanRouter } from "./features/directory-scan/router";
import { scanDirectory } from "./features/directory-scan";

dotenv.config();

async function runStartupActions(store: Store): Promise<void> {
  console.log("Running startup actions...");
  await store.dispatch(scanDirectory());
}

(async function () {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(initDirectoryScanRouter(store));

  await runStartupActions(store);

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
})();
