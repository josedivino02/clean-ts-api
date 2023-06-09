import MockDate from 'mockdate';
import {
  mockLoadSurveyByIdRepository,
  mockLoadSurveyResultRepository,
} from '@/data/test';
import { DbLoadSurveyResult } from './db-load-survey-result';
import {
  LoadSurveyByIdRepository,
  LoadSurveyResultRepository,
} from './db-load-survey-result-protocols';
import { mockSurveyResultModel, throwError } from '@/domain/test';

type SutTypes = {
  sut: DbLoadSurveyResult;
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository;
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository;
};

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepository();
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository();
  const sut = new DbLoadSurveyResult(
    loadSurveyResultRepositoryStub,
    loadSurveyByIdRepositoryStub
  );

  return {
    sut,
    loadSurveyResultRepositoryStub,
    loadSurveyByIdRepositoryStub,
  };
};

describe('DbLoadSurveyResult UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call LoadSurveyResultRepository', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();

    const loadBySurveyIdSpy = jest.spyOn(
      loadSurveyResultRepositoryStub,
      'loadBySurveyId'
    );

    await sut.load('any_survey_id');

    expect(loadBySurveyIdSpy).toHaveBeenCalledWith('any_survey_id');
  });

  test('Should throw if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();

    jest
      .spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
      .mockImplementationOnce(throwError);

    const promise = sut.load('any_survey_id');

    await expect(promise).rejects.toThrow();
  });

  test('Should call LoadSurveyByIdRepository if LoadSurveyResultRepository return null', async () => {
    const {
      sut,
      loadSurveyResultRepositoryStub,
      loadSurveyByIdRepositoryStub,
    } = makeSut();

    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById');

    jest
      .spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
      .mockReturnValueOnce(Promise.resolve(null));

    await sut.load('any_survey_id');

    expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id');
  });

  test('Should return SurveyResultModel with all answers with count 0 if LoadSurveyResultRepository return null', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();

    const loadByIdSpy = jest.spyOn(
      loadSurveyResultRepositoryStub,
      'loadBySurveyId'
    );

    jest
      .spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
      .mockReturnValueOnce(Promise.resolve(null));
    const surveyResult = await sut.load('any_survey_id');

    expect(surveyResult).toEqual(mockSurveyResultModel());
  });

  test('Should return SurveyResultModel on success', async () => {
    const { sut } = makeSut();

    const surveyResult = await sut.load('any_survey_id');

    expect(surveyResult).toEqual(mockSurveyResultModel());
  });
});
