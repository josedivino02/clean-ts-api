import {
  SurveyAnswerModel,
  SurveyModel,
} from '@/domain/models/survey.interface';

export type AddSurveyParams = Omit<SurveyModel, 'id'>;

export interface AddSurvey {
  add(data: AddSurveyParams): Promise<void>;
}
