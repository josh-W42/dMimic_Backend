import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { mainRouter } from '../v1/routes';
import { DB } from '../db/class';
import helmet from 'helmet';

export class DMimicService {
  private app: express.Express;
  private port: string | number = process.env.PORT || 8000;
  private readonly BaseURL: string = process.env.BaseURL || '/api/';
  private readonly APIversion: string = process.env.APIversion || 'v1';
  private db: DB;

  constructor() {
    this.app = express();
    this.db = new DB();
  }

  public Init() {
    this.app.use(morgan('combined'));
    this.app.use(cors());
    this.app.use(express.json());
    // Sets several http headers to increase security.
    // https://helmetjs.github.io/
    this.app.use(helmet());

    this.port = process.env.PORT || 8000;

    this.app.use(`${this.BaseURL}${this.APIversion}`, mainRouter);

    this.app.use((req, res) => {
      res.status(404).json({
        Response: 'Page Not Found',
        Status: 404,
        RequestedURL: req.originalUrl,
      });
    });

    this.app.listen(this.port, () => {
      console.log('API Running on PORT: ', this.port);
    });

    /**
     * // When an SSL Certificate and key is obtained and approved by a CA:
     * import { createServer as createHttpServer } from 'http';
     * import { createServer as createHttpsServer } from 'https';
     * import fs from 'fs';
     *
     * createHttpServer((req, res) => {
     *  res.writeHead(301, { 'Location': 'https://' + req.headers['host'] + req.url });
     *  res.end
     * });
     *
     * createHttpsServer({
     *   key: fs.readFileSync('server.key'),
     *   cert: fs.readFileSync('server.crt'),
     *   ca: [
     *     fs.readFileSync('intermediate1.crt'),
     *     fs.readFileSync('intermediate2.crt'),
     *     // ...
     *   ],
     * }, (req, res) => {
     *   // ...
     * }).listen(443);
     *
     */
  }

  public async ConnectDB() {
    if (await this.db.TestConnection()) {
      this.db.InitModels();
    }
  }
}
