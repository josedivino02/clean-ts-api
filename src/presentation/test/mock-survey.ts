import {
  AddSurvey,
  AddSurveyParams,
} from '@/domain/usecases/survey/add-survey.interface';
import { LoadSurveys } from '@/domain/usecases/survey/load-surveys.interface';
import { SurveyModel } from '@/domain/models/survey.interface';
import { mockSurveyModel, mockSurveyModels } from '@/domain/test';
import { LoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id.interface';

export const mockAddSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add(data: AddSurveyParams): Promise<void> {
      return Promise.resolve();
    }
  }

  return new AddSurveyStub();
};

export const mockLoadSurveys = (): LoadSurveys => {
  class LoadSurveysSub implements LoadSurveys {
    async load(): Promise<SurveyModel[]> {
      return Promise.resolve(mockSurveyModels());
    }
  }
  return new LoadSurveysSub();
};

export const mockLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById(id: string): Promise<SurveyModel> {
      return Promise.resolve(mockSurveyModel());
    }
  }

  return new LoadSurveyByIdStub();
};
