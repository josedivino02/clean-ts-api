import { badRequest, serverError, unauthorized, notFound } from './components';
import { accountSchema, errorSchema, loginParamsSchema } from './schemas';
import { loginPath } from './paths';
export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node API',
    description: 'Curso envolvendo boas práticas com Node',
    version: '1.0.0',
  },
  license: {
    name: 'ISC',
    url: '',
  },
  servers: [
    {
      url: '/api',
    },
  ],
  tags: [
    {
      name: 'Login',
    },
  ],
  paths: {
    '/login': loginPath,
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: errorSchema,
  },
  components: {
    badRequest,
    serverError,
    unauthorized,
    notFound,
  },
};
