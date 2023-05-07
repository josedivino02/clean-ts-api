import { SurveyResultModel } from '@/domain/models/survey-result.interface';

export interface LoadSurveyResult {
  load(surveyId: string): Promise<SurveyResultModel>;
}
