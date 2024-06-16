import debug from "debug";
import { Router } from "express";

const logger = debug("features:users:controller");
const route = Router();

route.get("/", (_req, res) => {
  logger('GET "/"');
  res.status(200).json({
    code: "users/ok",
    message: "list users",
    args: [],
  });
});

export { route };
