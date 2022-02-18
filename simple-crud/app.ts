import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import config from "config";
import connect from "./utils/db_connect";
import logger from "./utils/logger";
import routes from "./routes";

const host = config.get<number>("server.host");
const port = config.get<number>("server.port");

const app = express();

app.use(express.json());

app.listen(port, async () => {
  logger.info(`App is running at http://${host}:${port}`);

  await connect();

  routes(app);
});
