import { SurveyResultModel } from '@/domain/models/survey-result.interface';

export type SaveSurveyResultModel = Omit<SurveyResultModel, 'id'>;

export interface SaveSurveyResult {
  save(data: SaveSurveyResultModel): Promise<SurveyResultModel>;
}
