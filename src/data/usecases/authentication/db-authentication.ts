import {
  Authentication,
  AuthenticationModel,
} from "../../../domain/usecases/authentication.interface";
import { LoadAccountByEmailRepository } from "../../protocols/load-account-by-email.repository";

export class DbAuthentication implements Authentication {
  constructor(
    private loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async auth(authentication: AuthenticationModel): Promise<string> {
    await this.loadAccountByEmailRepository.load(authentication.email);

    return null;
  }
}