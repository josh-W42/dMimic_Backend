import { RequestHandler } from "express";
import { IServer } from "../../models/server";
import { DB } from "../../models";

export const create: RequestHandler = (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    res.status(400).json({
      Result: "Server Name Field Missing",
      Status: 400,
    });
    return;
  }

  const newServer: IServer = {
    id: Math.floor(Math.random() * 1000).toString(),
    name,
    description,
  };

  DB.servers.push(newServer);

  res.status(201).json({
    Result: "Success",
    Status: 201,
    Data: newServer,
  });
};
