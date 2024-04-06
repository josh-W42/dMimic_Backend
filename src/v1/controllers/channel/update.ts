import { RequestHandler } from "express";
import { Channel } from "../../../db/models";

export const update: RequestHandler = async (req, res) => {
  const { channelID } = req.params;
  const payload = req.body;

  if (!channelID) {
    res.status(400).json({
      Result: "Failed to Update Channel",
      Status: 400,
      Reason: "Channel ID Missing",
    });
    return;
  }

  try {
    const [numberModified, channelsModified] = await Channel.update(
      { ...payload },
      {
        where: {
          $id$: channelID,
        },
        returning: true,
      }
    );

    if (numberModified < 1) {
      res.status(400).json({
        Result: "Failed to Update Channel",
        Status: 400,
        Reason: "Invalid Channel ID",
      });
      return;
    }

    res.status(200).json({
      Result: "Channel Updated Successfully",
      Status: 200,
      Data: channelsModified[0],
    });
  } catch (error) {
    console.error("Failed to Update Channel: ", error);
    res.status(500).json({
      Result: "Failed to Update Channel",
      Status: 500,
      Reason: "An Unknown Error Has Occurred",
    });
  }
};
