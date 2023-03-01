import { boolean, object, string, TypeOf } from 'zod';

export const createAnswerSchema = object({
  body: object({
    title: string({
      required_error: 'Title is required',
    }),
    isAnswer: boolean(),
    questionId: string({
      required_error: 'Question is required',
    })
  }),
});

const params = {
  params: object({
    answerId: string(),
  }),
};

export const getAnswerSchema = object({
  ...params,
});

export const updateAnswerSchema = object({
  ...params,
  body: object({
    title: string(),
    isMandatory: string(),
    questionId: string()
  }).partial(),
});

export const deleteAnswerSchema = object({
  ...params,
});

export type CreateAnswerInput = TypeOf<typeof createAnswerSchema>['body'];
export type GetAnswerInput = TypeOf<typeof getAnswerSchema>['params'];
export type UpdateAnswerInput = TypeOf<typeof updateAnswerSchema>;
export type DeleteAnswerInput = TypeOf<typeof deleteAnswerSchema>['params'];
