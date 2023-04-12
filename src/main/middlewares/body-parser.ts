import { json, urlencoded } from "express";

export const bodyParser = json();
export const bodyParserEncoded = urlencoded();
