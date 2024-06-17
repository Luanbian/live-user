import debug from "debug";
import { Router } from "express";
import { validateBodyForCreateUser } from "./rules";
import { model } from "..";

const logger = debug("features:users:controller");
const route = Router();

route.post("/", validateBodyForCreateUser, async (req, res) => {
  try {
    const result = await model.createUser({
      user: req.body,
    });
    res.json({
      code: "api.live.user.create.success",
      message: "user created",
      data: result,
    });
  } catch (error) {
    logger("Create user failed: %O", error);
    res.status(500).json({
      code: "api.live.user.create.failed",
      message: `Create user failed: ${error}`,
    });
  }
});

route.get("/", async (req, res) => {
  try {
    res.set("Content-Type", "text/event-stream");
    res.set("Cache-Control", "no-cache");
    res.set("Connection", "keep-alive");
    res.flushHeaders();

    const sendEvent = (data: any) => {
      res.write(`data: ${JSON.stringify(data)}\n\n`);
      return !(res.closed || res.destroyed);
    };
  } catch (error) {
    logger("Get users failed: %O", error);
    res.write(`event: error\n`);
    res.write(`data: ${error}\n\n`);
    res.end();
  }
});

export { route };
