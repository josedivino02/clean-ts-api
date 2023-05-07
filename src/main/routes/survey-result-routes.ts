import { Router } from 'express';
import { adaptRoute } from '@/main/adapters/express-route-adapter';
import { makeSaveSurveyResultController } from '@/main/factories/controller/survey-result/save-survey-result/save-survey-result-controller.factory';
import { auth } from '@/main/middlewares/auth';
import { makeLoadSurveyResultController } from '../factories/controller/survey-result/load-survey-result/load-survey-result-controller.factory';

export default (router: Router): void => {
  router.put(
    '/surveys/:surveyId/results',
    auth,
    adaptRoute(makeSaveSurveyResultController())
  );

  router.get(
    '/surveys/:surveyId/results',
    auth,
    adaptRoute(makeLoadSurveyResultController())
  );
};
