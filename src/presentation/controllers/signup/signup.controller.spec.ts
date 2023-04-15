import { SignUpController } from "./signup.controller";
import {
  MissingParamError,
  InvalidParamError,
  ServerError,
} from "../../errors";
import {
  EmailValidator,
  AccountModel,
  AddAccount,
  AddAccountModel,
  HttpRequest,
  Validation,
} from "./signup-protocols";
import { ok, serverError, badRequest } from "../../helpers/http-helper";

// factory
const makeEmailValidator = (): EmailValidator => {
  // Um dublê de teste um Stub, tipos de mock
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }

  return new EmailValidatorStub();
};

// factory
const makeAddAccount = (): AddAccount => {
  // Um dublê de teste um Stub, tipos de mock
  class AddAccountStub implements AddAccount {
    async add(account: AddAccountModel): Promise<AccountModel> {
      return Promise.resolve(makeFakeAccount());
    }
  }

  return new AddAccountStub();
};

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error {
      return null;
    }
  }

  return new ValidationStub();
};

const makeFakeAccount = (): AccountModel => ({
  id: "valid_id",
  name: "valid_name",
  email: "valid_email@mail.com",
  password: "valid_password",
});

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: "any_name",
    email: "any_email@mail.com",
    password: "any_password",
    passwordConfirmation: "any_password",
  },
});

interface SutTypes {
  sut: SignUpController;
  emailValidatorStub: EmailValidator;
  addAccountStub: AddAccount;
  validationStub: Validation;
}

// factory
const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator();
  const addAccountStub = makeAddAccount();
  const validationStub = makeValidation();

  const sut = new SignUpController(
    emailValidatorStub,
    addAccountStub,
    validationStub
  );

  return {
    sut,
    emailValidatorStub,
    addAccountStub,
    validationStub,
  };
};

describe("signUp Controller", () => {
  test("Should return 400 if password confirmation fails", async () => {
    // system under test
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_email@@mail.com",
        password: "any_password",
        passwordConfirmation: "invalid_password",
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(
      badRequest(new InvalidParamError("passwordConfirmation"))
    );
  });

  test("Should return 400 if an invalid email is provided", async () => {
    // system under test
    const { sut, emailValidatorStub } = makeSut();
    // espionar /altera o valor
    jest.spyOn(emailValidatorStub, "isValid").mockReturnValueOnce(false);

    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual(badRequest(new InvalidParamError("email")));
  });

  test("Should call EmailValidator with correct email", async () => {
    // system under test
    const { sut, emailValidatorStub } = makeSut();
    // espionar /
    const isValidSpy = jest.spyOn(emailValidatorStub, "isValid");

    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_email@mail.com",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };

    await sut.handle(httpRequest);

    expect(isValidSpy).toHaveBeenCalledWith("any_email@mail.com");
  });

  test("Should return 500 if EmailValidator throws", async () => {
    const { sut, emailValidatorStub } = makeSut();

    jest.spyOn(emailValidatorStub, "isValid").mockImplementationOnce(() => {
      throw new Error();
    });

    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual(serverError(new ServerError(null)));
  });

  test("Should return 500 if AddAccount throws", async () => {
    const { sut, addAccountStub } = makeSut();

    jest.spyOn(addAccountStub, "add").mockImplementationOnce(async () => {
      return Promise.reject(new Error());
    });

    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual(serverError(new ServerError(null)));
  });

  test("Should call AddAccount with correct values", async () => {
    // system under test
    const { sut, addAccountStub } = makeSut();
    // espionar /
    const addSpy = jest.spyOn(addAccountStub, "add");

    sut.handle(makeFakeRequest());

    expect(addSpy).toHaveBeenCalledWith({
      name: "any_name",
      email: "any_email@mail.com",
      password: "any_password",
    });
  });

  test("Should return 200 if valid data is provided", async () => {
    // system under test
    const { sut } = makeSut();

    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual(ok(makeFakeAccount()));
  });

  test("Should Validation with correct values", async () => {
    // system under test
    const { sut, validationStub } = makeSut();
    // espionar /
    const validateSpy = jest.spyOn(validationStub, "validate");

    const httpRequest = makeFakeRequest();

    sut.handle(httpRequest);

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  test("Should return 400 if Validation returns an error", async () => {
    // system under test
    const { sut, validationStub } = makeSut();

    jest
      .spyOn(validationStub, "validate")
      .mockReturnValueOnce(new MissingParamError("any_field"));

    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual(
      badRequest(new MissingParamError("any_field"))
    );
  });
});
