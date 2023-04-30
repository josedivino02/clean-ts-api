import { SurveyResultModel } from '@/domain/models/survey-result.interface';

export type SaveSurveyResultParams = Omit<SurveyResultModel, 'id'>;

export interface SaveSurveyResult {
  save(data: SaveSurveyResultParams): Promise<SurveyResultModel>;
}
