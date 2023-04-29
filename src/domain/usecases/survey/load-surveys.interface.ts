import { SurveyModel } from "@/domain/models/survey.interface";

export interface LoadSurveys {
  load(): Promise<SurveyModel[]>;
}
