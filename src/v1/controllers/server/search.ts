import { RequestHandler } from "express";
import { Server } from "../../../db/models";
import { Op } from "sequelize";

export const search: RequestHandler = async (req, res) => {
  const { name } = req.query;

  if (Array.isArray(name)) {
    res.status(400).json({
      Result: "User Error",
      Status: 400,
      Reason: "Only query for one server name at a time.",
    });
    return;
  }

  try {
    const foundServers = await Server.findAll({
      where: {
        $name$: {
          [Op.iLike]: `%${name}`,
        },
      },
      attributes: ["id", "name", "description"],
    });

    res.status(200).json({
      Result: "Success",
      Status: 200,
      Data: foundServers,
    });
  } catch (err) {
    res.status(500).json({
      Result: "Failed to Perform Search",
      Status: 500,
    });
  }
};
