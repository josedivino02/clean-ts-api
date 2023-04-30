import { SurveyResultModel } from '@/domain/models/survey-result.interface';
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result.interface';

export const mockSaveSurveyResultParams = (): SaveSurveyResultParams => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  question: 'any_question',
  answer: 'any_answer',
  date: new Date(),
});

export const mockSurveyResultModel = (): SurveyResultModel =>
  Object.assign({}, mockSaveSurveyResultParams(), {
    id: 'any_id',
  });
