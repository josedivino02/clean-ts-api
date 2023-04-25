import {
  RequiredFieldValidation,
  ValidationComposite,
  EmailValidation,
  CompareFieldsValidation,
} from "@/validation/validators";
import { Validation } from "@/presentation/protocols/validation.interface";
import { EmailValidator } from "@/validation/protocols/email-validator.protocol";
import { makeSignUpValidation } from "./signup-validation.factory";

// mockar um modulo
jest.mock("@/validation/validators/validation-composite");

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }

  return new EmailValidatorStub();
};

describe("SignUpValidation Factory", () => {
  test("Should call ValidationComposite with all validations", () => {
    makeSignUpValidation();

    const validations: Validation[] = [];

    for (const field of ["name", "email", "password", "passwordConfirmation"]) {
      validations.push(new RequiredFieldValidation(field));
    }

    validations.push(
      new CompareFieldsValidation("password", "passwordConfirmation")
    );

    validations.push(new EmailValidation("email", makeEmailValidator()));

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
