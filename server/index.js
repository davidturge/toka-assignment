import dotenv from "dotenv";
import { server } from "./src/server.js";
import { openDbConnection } from "./src/db.js";

dotenv.config();

openDbConnection()
  .then(() => server.start())
  .catch((error) => console.error("failed to start server", error.message));
