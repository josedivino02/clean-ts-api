export const surveyResultAnswerSchema = {
  type: 'object',
  properties: {
    image: {
      type: 'string',
    },
    answer: {
      type: 'string',
    },
    date: {
      type: 'string',
    },
    count: {
      type: 'number',
    },
    percent: {
      type: 'number',
    },
  },
  required: ['answer', 'count', 'percent'],
};
