import { AuthenticationParams } from '@/domain/usecases/account/authentication.interface';
import { AccountModel } from '@/domain/models/account.interface';
import { AddAccountParams } from '@/domain/usecases/account/add-account.interface';

export const mockAddAccountParams = (): AddAccountParams => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
});

export const mockAccountModel = (): AccountModel =>
  Object.assign({}, mockAddAccountParams(), { id: 'any_id' });

export const mockAuthentication = (): AuthenticationParams => ({
  email: 'any_email@mail.com',
  password: 'any_password',
});
