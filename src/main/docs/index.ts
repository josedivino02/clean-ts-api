import {
  badRequest,
  serverError,
  unauthorized,
  notFound,
  forbidden,
} from './components';
import {
  accountSchema,
  errorSchema,
  loginParamsSchema,
  surveyAnswerSchema,
  surveySchema,
  surveysSchema,
  apiKeyAuthSchema,
} from './schemas';
import { loginPath, surveyPath } from './paths';

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
    {
      name: 'Enquete',
    },
  ],
  paths: {
    '/login': loginPath,
    '/surveys': surveyPath,
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: errorSchema,
    survey: surveySchema,
    surveys: surveysSchema,
    surveyAnswer: surveyAnswerSchema,
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema,
    },
    badRequest,
    serverError,
    unauthorized,
    notFound,
    forbidden,
  },
};
