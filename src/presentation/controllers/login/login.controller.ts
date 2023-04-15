import { EmailValidator } from "./../../protocols/email-validator.protocol";
import { InvalidParamError, MissingParamError } from "../../errors";
import { badRequest } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator;
  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return Promise.resolve(badRequest(new MissingParamError("email")));
    }

    if (!httpRequest.body.password) {
      return Promise.resolve(badRequest(new MissingParamError("password")));
    }

    const isValid = this.emailValidator.isValid(httpRequest.body.email);

    if (!isValid) {
      return Promise.resolve(badRequest(new InvalidParamError("email")));
    }
  }
}
