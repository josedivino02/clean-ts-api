import { SurveyResultModel } from '@/domain/models/survey-result.interface';
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result.interface';

export const mockSaveSurveyResultParams = (): SaveSurveyResultParams => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  question: 'any_question',
  answer: 'any_answer',
  date: new Date(),
});

export const mockSurveyResultModel = (): SurveyResultModel => ({
  surveyId: 'any_id',
  question: 'any_question',
  answers: [
    {
      answer: 'any_answer',
      count: 0,
      percent: 0,
    },
    {
      answer: 'other_answer',
      image: 'any_image',
      count: 0,
      percent: 0,
    },
  ],
  date: new Date(),
});
