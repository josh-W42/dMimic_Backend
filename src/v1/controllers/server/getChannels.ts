import { RequestHandler } from "express";
import { Channel } from "../../../db/models";

export const getChannels: RequestHandler = async (req, res) => {
  const { serverID } = req.params;

  if (!serverID) {
    res.status(400).json({
      Result: "Failed to Search For Channels",
      Status: 400,
      Reason: "Invalid Server ID",
    });
    return;
  }

  try {
    const channels = await Channel.findAll({
      where: {
        serverID,
      },
    });

    res.status(200).json({
      Result: "Success",
      Status: 200,
      Data: channels,
    });
  } catch (error) {
    console.error("Failed to Search For Channels: ", error);
    res.status(500).json({
      Result: "Failed to Search For Channels",
      Status: 500,
      Reason: "An Unknown Error Occurred While Searching For Channels",
    });
  }
};
