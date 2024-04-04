import { RequestHandler } from "express";
import { Server } from "../../../db/models";

export const update: RequestHandler = async (req, res) => {
  const { serverID } = req.params;
  const payload = req.body;

  if (!serverID) {
    res.status(400).json({
      Result: "User Error",
      Status: 400,
      Reason: "ServerID missing",
    });
  }
  try {
    const [rowsAffectedCount, rowsAffected] = await Server.update(
      { ...payload },
      {
        where: {
          $id$: serverID,
        },
        returning: true,
      }
    );

    if (rowsAffectedCount > 0) {
      res.status(200).json({
        Result: "Server Updated Successfully",
        Status: 200,
        Data: rowsAffected[0],
      });
    } else {
      res.status(200).json({
        Result: "Success",
        Status: 200,
        Reason: "No Changes Were Made",
        Data: {},
      });
    }
  } catch (error) {
    console.error("Failed to Update a Server: ", error);
    res.status(500).json({
      Result: "Failed to Update Server",
      Status: 500,
      Reason: "An Unknown Error Occurred",
      Data: {},
    });
  }
};
