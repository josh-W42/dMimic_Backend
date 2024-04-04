import { RequestHandler } from "express";
import { Server } from "../../../db/models";

export const update: RequestHandler = async (req, res) => {
  const { serverID } = req.params;
  const { name, description, isPublic } = req.body;

  if (!serverID) {
    res.status(400).json({
      Result: "User Error",
      Status: 400,
      Reason: "ServerID missing",
    });
  }
  try {
    const numberUpdated = await Server.update(
      { name, description, isPublic },
      {
        where: {
          $id$: serverID,
        },
      }
    );

    if (numberUpdated[0] > 0) {
      res.status(200).json({
        Result: "Server Updated Successfully",
        Status: 200,
      });
    } else {
      res.status(200).json({
        Result: "Success",
        Status: 200,
        Reason: "No Changes Were Made",
      });
    }
  } catch (error) {
    console.error("Failed to Update a Server: ", error);
    res.status(500).json({
      Result: "Failed to Update Server",
      Status: 500,
      Reason: "An Unknown Error Occurred",
    });
  }
};
