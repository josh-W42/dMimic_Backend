import express from "express";
import morgan from "morgan";
import cors from "cors";
import { mainRouter } from "../v1/routes";
import { DB } from "../db/class";

export class DMimicService {
  private app: express.Express;
  private port: string | number = process.env.PORT || 8000;
  private readonly BaseURL: string = process.env.BaseURL || "/api/";
  private readonly APIversion: string = process.env.APIversion || "v1";
  private db: DB;

  constructor() {
    this.app = express();
    this.db = new DB();
  }

  public Init() {
    this.app.disable('x-powered-by');

    this.app.use(morgan('combined'));
    this.app.use(cors());
    this.app.use(express.json());

    this.port = process.env.PORT || 8000;

    this.app.use(`${this.BaseURL}${this.APIversion}`, mainRouter);
    this.app.listen(this.port, () => {
      console.log("API Running on PORT: ", this.port);
    });
  }

  public async ConnectDB() {
    if (await this.db.TestConnection()) {
      this.db.InitModels();
    }
  }
}
