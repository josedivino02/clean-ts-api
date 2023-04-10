import { SignUpController } from './signup'

describe('signUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    // system under test
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        email: 'any_email@@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: name'))
  })

  test('Should return 400 if no email is provided', () => {
    // system under test
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      }
    }

    const httpResponse = sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: email'))
  })
})