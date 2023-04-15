import { InvalidParamError } from "../../errors";
import { EmailValidator } from "../../protocols/email-validator.protocol";
import { Validation } from "./validation.interface";

export class EmailValidation implements Validation {
  constructor(
    private fieldName: string,
    private emailValidator: EmailValidator
  ) {}

  validate(input: any): Error {
    const isValid = this.emailValidator.isValid(input[this.fieldName]);

    if (!isValid) {
      return new InvalidParamError(this.fieldName);
    }
  }
}
