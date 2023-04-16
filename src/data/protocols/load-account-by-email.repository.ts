import { AccountModel } from "../../domain/models/account.interface";

export interface LoadAccountByEmailRepository {
  load(email: string): Promise<AccountModel>;
}
