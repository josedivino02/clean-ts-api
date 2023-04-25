import { AddSurveyModel } from "@/domain/usecases/add-survey.interface";

export interface AddSurveyRepository {
  add(surveyData: AddSurveyModel): Promise<void>;
}
