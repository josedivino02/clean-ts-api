import { DbSaveSurveyResult } from './db-save-survey-result';
import {
  SaveSurveyResultRepository,
  LoadSurveyResultRepository,
} from './db-save-survey-result-protocols';
import MockDate from 'mockdate';
import {
  mockSaveSurveyResultParams,
  throwError,
  mockSurveyResultModel,
} from '@/domain/test';
import {
  mockLoadSurveyResultRepository,
  mockSaveSurveyResultRepository,
} from '@/data/test';

type SutTypes = {
  sut: DbSaveSurveyResult;
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository;
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository;
};

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository();
  const saveSurveyResultRepositoryStub = mockSaveSurveyResultRepository();

  const sut = new DbSaveSurveyResult(
    saveSurveyResultRepositoryStub,
    loadSurveyResultRepositoryStub
  );

  return {
    sut,
    saveSurveyResultRepositoryStub,
    loadSurveyResultRepositoryStub,
  };
};

describe('DbSaveSurveyResult Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();

    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save');

    const surveyResultData = mockSaveSurveyResultParams();

    await sut.save(surveyResultData);

    expect(saveSpy).toHaveBeenCalledWith(surveyResultData);
  });

  test('Should call LoadSurveyResultRepository with correct values', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();

    const loadBySurveyIdSpy = jest.spyOn(
      loadSurveyResultRepositoryStub,
      'loadBySurveyId'
    );

    const surveyResultData = mockSaveSurveyResultParams();

    await sut.save(surveyResultData);

    expect(loadBySurveyIdSpy).toHaveBeenCalledWith(surveyResultData.surveyId);
  });

  test('Should throw if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();

    jest
      .spyOn(saveSurveyResultRepositoryStub, 'save')
      .mockImplementationOnce(throwError);

    const promise = sut.save(mockSaveSurveyResultParams());

    await expect(promise).rejects.toThrow();
  });

  test('Should throw if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();

    jest
      .spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
      .mockImplementationOnce(throwError);

    const promise = sut.save(mockSaveSurveyResultParams());

    await expect(promise).rejects.toThrow();
  });

  test('Should return SurveyResult on success', async () => {
    const { sut } = makeSut();

    const surveyResult = await sut.save(mockSaveSurveyResultParams());

    expect(surveyResult).toEqual(mockSurveyResultModel());
  });
});
