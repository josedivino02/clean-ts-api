import { makeAuthMiddleware } from "./../factories/middlewares/auth-middleware.factory";
import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeAddSurveyController } from "../factories/controller/survey/add-survey/add-survey-controller.factory";
import { adaptMiddleware } from "../adapters/express-middleware-adapter";

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware("admin"));

  router.post("/surveys", adminAuth, adaptRoute(makeAddSurveyController()));
};
