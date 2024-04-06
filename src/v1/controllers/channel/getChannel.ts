import { RequestHandler } from "express";
import { Channel } from "../../../db/models";

export const getChannel: RequestHandler = async (req, res) => {
  const { channelID } = req.params;

  if (!channelID) {
    res.status(400).json({
      Result: "Failed to Find Channel",
      Status: 400,
      Reason: "Invalid Channel ID",
    });
    return;
  }

  try {
    const channel = await Channel.findByPk(channelID);

    if (!channel) {
      res.status(400).json({
        Result: "Failed to Find Channel",
        Status: 400,
        Reason: "Invalid Channel ID",
      });
      return;
    }

    res.status(200).json({
      Result: "Successfully Found Channel",
      Status: 200,
      Data: channel,
    });
  } catch (error) {
    console.error("Failed to Find Channel: ", error);
    res.status(500).json({
      Result: "Failed to Find Channel",
      Status: 500,
      Reason: "An Unknown Error Has Occurred",
    });
  }
};
