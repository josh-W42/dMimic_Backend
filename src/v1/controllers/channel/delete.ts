import { RequestHandler } from "express";
import { Channel } from "../../../db/models";

export const deleteChannel: RequestHandler = async (req, res) => {
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
    const deleteCount = await Channel.destroy({
      where: {
        $id$: channelID,
      },
    });

    if (deleteCount > 0) {
      res.status(200).json({
        Result: "Channel Deleted Successfully",
        status: 200,
      });
    } else {
      res.status(200).json({
        Result: "No Action Taken",
        Status: 200,
        Reason: "Invalid Channel ID",
      });
    }
  } catch (error) {
    console.error("Failed to Delete Channel: ", error);
    res.status(500).json({
      Result: "Failed to Delete Channel",
      Status: 500,
      Reason: "An Unknown Error Has Occurred",
    });
  }
};
