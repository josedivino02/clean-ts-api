import { AccountModel } from '@/domain/models/account.interface';
import {
  AddAccount,
  AddAccountParams,
} from '@/domain/usecases/account/add-account.interface';
import { mockAccountModel } from '@/domain/test';

import {
  Authentication,
  AuthenticationParams,
} from '@/domain/usecases/account/authentication.interface';
import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token.interface';

// factory
export const mockAddAccount = (): AddAccount => {
  // Um dublê de teste um Stub, tipos de mock
  class AddAccountStub implements AddAccount {
    async add(account: AddAccountParams): Promise<AccountModel> {
      return Promise.resolve(mockAccountModel());
    }
  }

  return new AddAccountStub();
};

export const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth(authentication: AuthenticationParams): Promise<string> {
      return Promise.resolve('any_token');
    }
  }
  return new AuthenticationStub();
};

export const mockLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load(
      accessToken: string,
      role?: string | undefined
    ): Promise<AccountModel> {
      return Promise.resolve(mockAccountModel());
    }
  }

  return new LoadAccountByTokenStub();
};
