import { AddSurveyParams } from '@/domain/usecases/survey/add-survey.interface';

export interface AddSurveyRepository {
  add(surveyData: AddSurveyParams): Promise<void>;
}
