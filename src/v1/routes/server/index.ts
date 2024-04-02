import { Router } from "express";
import { controllers } from "../../controllers";

export const serverRouter = Router();

// It may be useful to have middleware that records requests for an audit log for the server.

serverRouter.post("/new", controllers.server.create);
