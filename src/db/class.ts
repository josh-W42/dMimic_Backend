import { Sequelize } from "sequelize";

export class DB {
  private sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize(`${process.env.databaseURL}`);
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
