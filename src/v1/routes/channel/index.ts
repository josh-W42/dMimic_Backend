import { Router } from "express";
import { controllers } from "../../controllers";

export const channelRouter = Router();

channelRouter.put("/:channelID/update", controllers.channel.update);
