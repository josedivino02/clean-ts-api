import { SaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result.repository';
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result.interface';
import { SurveyResultModel } from '@/domain/models/survey-result.interface';
import { mockSurveyResultModel } from '@/domain/test/mock-survey-result';

export const mockSaveSurveyResultRepository =
  (): SaveSurveyResultRepository => {
    class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
      async save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
        return Promise.resolve(mockSurveyResultModel());
      }
    }

    return new SaveSurveyResultRepositoryStub();
  };
