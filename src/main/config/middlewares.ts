import { Express } from "express";
import { bodyParser, bodyParserEncoded } from "../middlewares/body-parser";

export default (app: Express): void => {
  app.use(bodyParser);
  app.use(bodyParserEncoded);
};
