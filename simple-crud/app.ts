import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import config from "config";
import connect from "./src/utils/db_connect";
import logger from "./src/utils/logger";
import routes from "./routes";
import deserializeUser from "./src/middleware/deserializeUser";

const host = config.get<number>("server.host");
const port = config.get<number>("server.port");

const app = express();

app.use(express.json());

app.use(deserializeUser);

app.listen(port, async () => {
  logger.info(`App is running at http://${host}:${port}`);

  await connect();

  routes(app);
});
