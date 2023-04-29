import { DbAddSurvey } from '@/data/usecases/survey/add-survey/db-add-survey.usecase';
import { AddSurvey } from '@/domain/usecases/survey/add-survey.interface';
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo.repository';

export const makeDbAddSurvey = (): AddSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository();

  return new DbAddSurvey(surveyMongoRepository);
};
