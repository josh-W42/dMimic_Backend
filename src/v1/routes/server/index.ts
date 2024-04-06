import { Router } from "express";
import { controllers } from "../../controllers";

export const serverRouter = Router();

// It may be useful to have middleware that records requests for an audit log for the server.

serverRouter.post("/new", controllers.server.create);
serverRouter.get("/search", controllers.server.search);
serverRouter.put("/:serverID/update", controllers.server.update);
serverRouter.delete("/:serverID/delete", controllers.server.softDelete);
serverRouter.post("/:serverID/channels/new", controllers.server.addChannel);
serverRouter.get("/:serverID/channels/get", controllers.server.getChannels);
