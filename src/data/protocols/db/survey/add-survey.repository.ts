import { AddSurveyModel } from '@/domain/usecases/survey/add-survey.interface';

export interface AddSurveyRepository {
  add(surveyData: AddSurveyModel): Promise<void>;
}
