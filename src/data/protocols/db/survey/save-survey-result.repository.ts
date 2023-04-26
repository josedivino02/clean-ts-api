import { SurveyResultModel } from '@/domain/models/survey-result.interface';
import { SaveSurveyResultModel } from '@/domain/usecases/save-survey-result.interface';

export interface SaveSurveyResultRepository {
  save(data: SaveSurveyResultModel): Promise<SurveyResultModel>;
}
