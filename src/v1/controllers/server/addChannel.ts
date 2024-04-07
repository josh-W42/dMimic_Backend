import { RequestHandler } from "express";
import { nanoid } from "nanoid";
import { Server } from "../../../db/models";

export const addChannel: RequestHandler = async (req, res) => {
  const { serverID } = req.params;
  const { name, description, isPublic, isVoiceChannel } = req.body;

  if (!serverID) {
    res.status(400).json({
      Result: "Failed to Add Channel",
      Status: 400,
      Reason: "Invalid Server ID",
    });
  }

  let server: Server | null;

  try {
    server = await Server.findByPk(serverID);
    if (!server) {
      res.status(400).json({
        Result: "Failed to Add Channel",
        Status: 400,
        Reason: "Invalid Server ID",
      });
      return;
    }
  } catch (error) {
    console.error("Failed to Add Channel: ", error);
    res.status(500).json({
      Result: "Failed to Add Channel",
      Status: 500,
      Reason: "An Unknown Error Has Occurred During Server Lookup.",
    });
    return;
  }

  try {
    const newChannel = await server.createChannel({
      id: nanoid(),
      name,
      description,
      isPublic,
      isVoiceChannel,
    });

    res.status(200).json({
      Result: "Channel Created Successfully",
      Status: 200,
      Data: newChannel,
    });
  } catch (error) {
    res.status(500).json({
      Result: "Failed to Add Channel",
      Status: 500,
      Reason: "An Unknown Error Has Occurred During Channel Creation",
    });
  }
};
