import { SurveyResultModel } from '@/domain/models/survey-result.interface';

export interface LoadSurveyResultRepository {
  loadBySurveyId(surveyId: string): Promise<SurveyResultModel>;
}
