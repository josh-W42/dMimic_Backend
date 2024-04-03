import { RequestHandler } from "express";
import { Server } from "../../../db/models";

export const create: RequestHandler = async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    res.status(400).json({
      Result: "Server Name Field Missing",
      Status: 400,
    });
    return;
  }

  try {
    const newServer = await Server.create({
      name,
      description,
    });

    res.status(201).json({
      Result: "Success",
      Status: 201,
      Data: newServer,
    });
  } catch (err) {
    console.error("Failed to create new server: ", err);
    res.status(500).json({
      Result: "Failed to Create New Server",
      Status: 500,
    });
  }
};
