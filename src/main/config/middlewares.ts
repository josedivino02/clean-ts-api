import { Express } from "express";
import { bodyParser, bodyParserEncoded } from "../middlewares/body-parser";
import { cors } from "../middlewares/cors";

export default (app: Express): void => {
  app.use(bodyParser);
  app.use(bodyParserEncoded);
  app.use(cors);
};
