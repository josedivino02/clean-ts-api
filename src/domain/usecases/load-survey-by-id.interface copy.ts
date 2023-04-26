import { SurveyModel } from '@/domain/models/survey.interface';

export interface LoadSurveyById {
  loadById(id: string): Promise<SurveyModel>;
}
