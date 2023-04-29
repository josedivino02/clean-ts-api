import { SurveyResultModel } from '@/domain/models/survey-result.interface';
import { SaveSurveyResultModel } from '@/domain/usecases/survey-result/save-survey-result.interface';

export interface SaveSurveyResultRepository {
  save(data: SaveSurveyResultModel): Promise<SurveyResultModel>;
}
