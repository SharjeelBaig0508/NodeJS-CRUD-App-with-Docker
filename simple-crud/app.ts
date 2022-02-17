import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import config from "config";;

const host = config.get<number>("server.host");
const port = config.get<number>("server.port");

const app = express();

app.use(express.json());

app.listen(port, async () => {
  console.log(`App is running at http://${host}:${port}`);
});
