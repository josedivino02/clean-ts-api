import { LoadSurveysController } from './load-surveys-controller';
import { LoadSurveys } from './load-survey-controller-protocols';
import MockDate from 'mockdate';
import {
  noContent,
  ok,
  serverError,
} from '@/presentation/helpers/http/http-helper';
import { throwError, mockSurveyModels } from '@/domain/test';
import { mockLoadSurveys } from '@/presentation/test';

type SutTypes = {
  sut: LoadSurveysController;
  loadSurveyStub: LoadSurveys;
};

const makeSut = (): SutTypes => {
  const loadSurveyStub = mockLoadSurveys();

  const sut = new LoadSurveysController(loadSurveyStub);

  return {
    sut,
    loadSurveyStub,
  };
};

describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('Should call LoadSurveys', async () => {
    const { sut, loadSurveyStub } = makeSut();

    const loadSpy = jest.spyOn(loadSurveyStub, 'load');

    await sut.handle({});

    expect(loadSpy).toHaveBeenCalledWith();
  });

  test('Should return 200 on success', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle({});

    expect(httpResponse).toEqual(ok(mockSurveyModels()));
  });

  test('Should return 204 if LoadSurveys returns empty', async () => {
    const { sut, loadSurveyStub } = makeSut();

    jest.spyOn(loadSurveyStub, 'load').mockReturnValueOnce(Promise.resolve([]));

    const httpResponse = await sut.handle({});

    expect(httpResponse).toEqual(noContent());
  });

  test('Should return 500 if LoadSurvey throws', async () => {
    const { sut, loadSurveyStub } = makeSut();

    jest.spyOn(loadSurveyStub, 'load').mockImplementationOnce(throwError);

    const httpResponse = await sut.handle({});

    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
