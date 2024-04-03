import { DataTypes, Sequelize } from "sequelize";
import { Server } from "./models";

export class DB {
  private sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize(`${process.env.databaseURL}`);
  }

  public InitModels() {
    Server.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        tableName: "servers",
        sequelize: this.sequelize,
      }
    );

    this.sequelize.sync();
  }

  public async TestConnection(): Promise<boolean> {
    try {
      await this.sequelize.authenticate();
      console.log("Connection to Database Successful");
      return true;
    } catch (error) {
      console.error("Unable to connect to database:", error);
      return false;
    }
  }
}
