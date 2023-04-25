import { AccountModel } from "@/domain/models/account.interface";

export interface LoadAccountByEmailRepository {
  loadByEmail(email: string): Promise<AccountModel>;
}
