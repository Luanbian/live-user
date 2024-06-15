import express from "express";
import cors from "cors";
import debug from "debug";
import { EXPRESS_PORT } from "../../constants/express";

const logger = debug("services:express");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(EXPRESS_PORT, () => {
  logger(`Express server is running on port ${EXPRESS_PORT}`);
});

app.get("/", (_req, res) => {
  res.status(200).json({
    code: "echo",
    message: "OK",
    args: [],
  });
});

export { app };
