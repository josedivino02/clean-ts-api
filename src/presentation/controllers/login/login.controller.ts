import { EmailValidator } from "./../../protocols/email-validator.protocol";
import { InvalidParamError, MissingParamError } from "../../errors";
import { badRequest, serverError } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator;
  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body;

    try {
      if (!email) {
        return Promise.resolve(badRequest(new MissingParamError("email")));
      }

      if (!password) {
        return Promise.resolve(badRequest(new MissingParamError("password")));
      }

      const isValid = this.emailValidator.isValid(email);

      if (!isValid) {
        return Promise.resolve(badRequest(new InvalidParamError("email")));
      }
    } catch (error) {
      return serverError(error);
    }
  }
}
