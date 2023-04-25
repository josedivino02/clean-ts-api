import { HashComparer } from "@/data/protocols/cryptography/hash-comparer";
import { Hasher } from "@/data/protocols/cryptography/hasher";
import bcrypt from "bcrypt";

export class BcryptAdapter implements Hasher, HashComparer {
  constructor(private readonly salt: number) {}

  async hash(value: string): Promise<string> {
    const hash = bcrypt.hash(value, this.salt);
    return hash;
  }

  async compare(value: string, hash: string): Promise<boolean> {
    const isValid = bcrypt.compare(value, hash);

    return isValid;
  }
}
