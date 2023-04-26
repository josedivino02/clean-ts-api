import { SurveyModel } from '@/domain/models/survey.interface';

export interface LoadSurveyByIdRepository {
  loadById(id: string): Promise<SurveyModel>;
}
