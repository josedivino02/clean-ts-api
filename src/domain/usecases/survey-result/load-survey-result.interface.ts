import { SurveyResultModel } from '@/domain/models/survey-result.interface';

export interface LoadSurveyResult {
  save(surveyId: string): Promise<SurveyResultModel>;
}
