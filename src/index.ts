import debug from "debug";
import * as features from "./features";
import { app } from "./services/express";

const logger = debug("core");

logger("Starting server...");

app.use(features.users.controllers.router);
