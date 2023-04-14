import { SignUpController } from "../../presentation/controllers/signup/signup.controller";
import { EmailValidatorAdapter } from "../../utils/email-validator-adapter.util";
import { DbAddAccount } from "../../data/usecases/add-account/db-add-account.usecase";
import { BcryptAdapter } from "../../infra/cryptography/bcrypt-adapter";
import { AccountMongoRepository } from "../../infra/db/mongodb/account-repository/account.repository";
import { LogMongoRepository } from "../../infra/db/mongodb/log-repository/log.repository";
import { Controller } from "../../presentation/protocols";
import { LogControllerDecorator } from "../decorators/log.decorator";

export const makeSignUpController = (): Controller => {
  const salt = 12;

  const emailValidatorAdapter = new EmailValidatorAdapter();

  const bcryptAdapter = new BcryptAdapter(salt);

  const accountMongoRepository = new AccountMongoRepository();

  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository);

  const signUpController = new SignUpController(
    emailValidatorAdapter,
    dbAddAccount
  );

  const logMongoRepository = new LogMongoRepository();

  return new LogControllerDecorator(signUpController, logMongoRepository);
};
