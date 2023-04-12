import { Express } from "express";
import { bodyParser, bodyParserEncoded } from "../middlewares/body-parser";
import { cors } from "../middlewares/cors";
import { contentType } from "../middlewares/content-type";

export default (app: Express): void => {
  app.use(bodyParser);
  app.use(bodyParserEncoded);
  app.use(cors);
  app.use(contentType);
};
