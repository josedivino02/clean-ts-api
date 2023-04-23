import { LoadSurveysController } from "./load-surveys-controller";
import { LoadSurveys, SurveyModel } from "./load-survey-controller-protocols";
import MockDate from "mockdate";
import { ok, serverError } from "../../../helpers/http/http-helper";

const makeFakeSurveys = (): SurveyModel[] => {
  return [
    {
      id: "any_id",
      question: "any_question",
      answers: [
        {
          image: "any_image",
          answer: "any_answer",
        },
      ],
      date: new Date(),
    },
    {
      id: "other_id",
      question: "other_question",
      answers: [
        {
          image: "other_image",
          answer: "other_answer",
        },
      ],
      date: new Date(),
    },
  ];
};

const makeLoadSurveys = (): LoadSurveys => {
  class LoadSurveysSub implements LoadSurveys {
    async load(): Promise<SurveyModel[]> {
      return Promise.resolve(makeFakeSurveys());
    }
  }
  return new LoadSurveysSub();
};

interface SutTypes {
  sut: LoadSurveysController;
  loadSurveyStub: LoadSurveys;
}

const makeSut = (): SutTypes => {
  const loadSurveyStub = makeLoadSurveys();

  const sut = new LoadSurveysController(loadSurveyStub);

  return {
    sut,
    loadSurveyStub,
  };
};

describe("LoadSurveys Controller", () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test("Should call LoadSurveys", async () => {
    const { sut, loadSurveyStub } = makeSut();

    const loadSpy = jest.spyOn(loadSurveyStub, "load");

    await sut.handle({});

    expect(loadSpy).toHaveBeenCalledWith();
  });

  test("Should return 200 on success", async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle({});

    expect(httpResponse).toEqual(ok(makeFakeSurveys()));
  });

  test("Should return 500 if LoadSurvey throws", async () => {
    const { sut, loadSurveyStub } = makeSut();

    jest
      .spyOn(loadSurveyStub, "load")
      .mockReturnValueOnce(Promise.reject(new Error()));

    const httpResponse = await sut.handle({});

    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
