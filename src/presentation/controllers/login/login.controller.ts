import { Authentication } from "./../../../domain/usecases/authentication.interface";
import { EmailValidator } from "./../../protocols/email-validator.protocol";
import { InvalidParamError, MissingParamError } from "../../errors";
import { badRequest, serverError } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator;
  private readonly authentication: Authentication;
  constructor(emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator;
    this.authentication = authentication;
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

      await this.authentication.auth(email, password);
    } catch (error) {
      return serverError(error);
    }
  }
}
