import { Express } from "express";
import {
  bodyParser,
  bodyParserEncoded,
  cors,
  contentType,
} from "../middlewares";

export default (app: Express): void => {
  app.use(bodyParser);
  app.use(bodyParserEncoded);
  app.use(cors);
  app.use(contentType);
};
