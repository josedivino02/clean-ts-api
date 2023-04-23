import { SurveyModel } from "../models/survey.interface";

export interface LoadSurveys {
  load(): Promise<SurveyModel[]>;
}
