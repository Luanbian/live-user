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

export { route };
