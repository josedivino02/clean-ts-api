import { LoadAccountByToken } from "./../../domain/usecases/load-account-by-token.interface";
import { AuthMiddleware } from "./auth.middleware";
import { AccessDeniedError } from "../errors";
import { forbidden } from "./../helpers/http/http-helper";
import { AccountModel } from "../../domain/models/account.interface";

const makeFakeAccount = (): AccountModel => ({
  id: "any_id",
  name: "any_name",
  email: "any_email@mail.com",
  password: "hashed_password",
});

describe("Auth Middleware", () => {
  test("Should return 403 if no x-access-token exists in headers", async () => {
    class LoadAccountByTokenStub implements LoadAccountByToken {
      async load(
        accessToken: string,
        role?: string | undefined
      ): Promise<AccountModel> {
        return Promise.resolve(makeFakeAccount());
      }
    }

    const loadAccountByTokenStub = new LoadAccountByTokenStub();
    const sut = new AuthMiddleware(loadAccountByTokenStub);

    const httpResponse = await sut.handle({});

    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });

  test("Should call LoadAccountByToken with correct accessToken", async () => {
    class LoadAccountByTokenStub implements LoadAccountByToken {
      async load(
        accessToken: string,
        role?: string | undefined
      ): Promise<AccountModel> {
        return Promise.resolve(makeFakeAccount());
      }
    }

    const loadAccountByTokenStub = new LoadAccountByTokenStub();

    const loadSpy = jest.spyOn(loadAccountByTokenStub, "load");

    const sut = new AuthMiddleware(loadAccountByTokenStub);

    const httpResponse = await sut.handle({
      headers: {
        "x-access-token": "any_token",
      },
    });

    expect(loadSpy).toHaveBeenCalledWith("any_token");
  });
});
