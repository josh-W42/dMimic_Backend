import { RequestHandler } from "express";
import { Server } from "../../../db/models";

export const softDelete: RequestHandler = async (req, res) => {
  const { serverID } = req.params;

  if (!serverID) {
    res.status(400).json({
      Result: "Failed to Soft Delete Server",
      Status: 400,
      Reason: "Invalid Server ID",
    });
  }

  try {
    const numDestroyedRows = await Server.destroy({
      where: {
        $id$: serverID,
      },
    });

    if (numDestroyedRows > 0) {
      res.status(200).json({
        Result: "Soft Deletion of Server Successful",
        Status: 200,
      });
    } else {
      res.status(200).json({
        Result: "No Deletion Occurred",
        Status: 200,
        Reason: "Invalid Server ID",
      });
    }
  } catch (error) {
    console.error("Failed Soft Deletion of Server: ", error);
    res.status(500).json({
      Result: "Failed to Soft Delete Server",
      Status: 500,
      Reason: "An Unknown Error Has Occurred",
    });
  }
};
