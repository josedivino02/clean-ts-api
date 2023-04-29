import { DbSaveSurveyResult } from '@/data/usecases/survey-result/save-survey-result/db-save-survey-result';
import { SaveSurveyResult } from '@/domain/usecases/survey-result/save-survey-result.interface';
import { SurveyResultMongoRepository } from '@/infra/db/mongodb/survey-result/survey-result-mongo.repository';

export const makeDbSaveSurveyResult = (): SaveSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository();

  return new DbSaveSurveyResult(surveyResultMongoRepository);
};
