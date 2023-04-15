import { InvalidParamError, MissingParamError } from "../../errors";
import { Validation } from "../../protocols/validation.interface";

export class CompareFieldsValidation implements Validation {
  constructor(private fieldName: string, private fieldToCompareName: string) {}

  validate(input: any): Error {
    if (input[this.fieldName] !== input[this.fieldToCompareName])
      return new InvalidParamError(this.fieldToCompareName);
  }
}
