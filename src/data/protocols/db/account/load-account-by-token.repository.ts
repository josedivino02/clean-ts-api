import { AccountModel } from "@/domain/models/account.interface";

export interface LoadAccountByTokenRepository {
  loadByToken(token: string, role?: string): Promise<AccountModel>;
}
