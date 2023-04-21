import { AccountModel } from "../models/account.interface";

export interface LoadAccountByToken {
  load(accessToken: string, role?: string): Promise<AccountModel>;
}
