import { AccountModel } from "@/domain/models/account.interface";

export interface LoadAccountByToken {
  load(accessToken: string, role?: string): Promise<AccountModel>;
}
