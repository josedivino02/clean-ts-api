import { makeLoginValidation } from "./login-validation.factory";
import { EmailValidation } from "../../../presentation/helpers/validators/email-validation";
import { RequiredFieldValidation } from "../../../presentation/helpers/validators/required-field-validation";
import { ValidationComposite } from "../../../presentation/helpers/validators/validation-composite";
import { Validation } from "../../../presentation/protocols/validation.interface";
import { EmailValidator } from "../../../presentation/protocols/email-validator.protocol";

// mockar um modulo
jest.mock("../../presentation/helpers/validators/validation-composite");

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }

  return new EmailValidatorStub();
};

describe("LoginValidation Factory", () => {
  test("Should call ValidationComposite with all validations", () => {
    makeLoginValidation();

    const validations: Validation[] = [];

    for (const field of ["name", "email"]) {
      validations.push(new RequiredFieldValidation(field));
    }

    validations.push(new EmailValidation("email", makeEmailValidator()));

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
