import { SurveyAnswerModel } from "@/domain/models/survey.interface";

export interface AddSurveyModel {
  question: string;
  answers: SurveyAnswerModel[];
  date: Date;
}

export interface AddSurvey {
  add(data: AddSurveyModel): Promise<void>;
}
