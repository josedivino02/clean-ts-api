import { AddAccountParams } from '@/domain/usecases/account/add-account.interface';
import { AccountModel } from '@/domain/models/account.interface';

export interface AddAccountRepository {
  add(accountData: AddAccountParams): Promise<AccountModel>;
}
