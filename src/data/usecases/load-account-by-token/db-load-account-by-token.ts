import { Decrypter } from '@/data/protocols/cryptography/decrypter';
import { LoadAccountByToken } from '@/domain/usecases/load-account-by-token.interface';
import { AccountModel } from '@/data/usecases/add-account/db-add-account-protocols';
import { LoadAccountByTokenRepository } from '@/data/protocols/db/account/load-account-by-token.repository';

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load(accessToken: string, role?: string): Promise<AccountModel> {
    const token = await this.decrypter.decrypt(accessToken);
    // CORRIGIR
    if (token) {
      const account = await this.loadAccountByTokenRepository.loadByToken(
        accessToken,
        role
      );

      if (account) {
        return account;
      }
    }

    return null;
  }
}
