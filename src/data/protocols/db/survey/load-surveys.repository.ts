import { SurveyModel } from "../../../../domain/models/survey.interface";

export interface LoadSurveysRepository {
  loadAll(): Promise<SurveyModel[]>;
}
