import { SurveyResultModel } from '@/domain/models/survey-result.interface';
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result.interface';

export interface SaveSurveyResultRepository {
  save(data: SaveSurveyResultParams): Promise<void>;
}
