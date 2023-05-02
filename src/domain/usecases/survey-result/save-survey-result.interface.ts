import { SurveyResultModel } from '@/domain/models/survey-result.interface';

export type SaveSurveyResultParams = {
  surveyId: string;
  accountId: string;
  question: string;
  answer: string;
  date: Date;
};

export interface SaveSurveyResult {
  save(data: SaveSurveyResultParams): Promise<SurveyResultModel>;
}
