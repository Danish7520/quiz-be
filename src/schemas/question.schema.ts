import { boolean, object, string, TypeOf } from 'zod';

export const createQuestionSchema = object({
  body: object({
    title: string({
      required_error: 'Title is required',
    }),
    isMandatory: boolean(),
    quizId: string({
      required_error: 'Quiz is required',
    })
  }),
});

const params = {
  params: object({
    questionId: string(),
  }),
};

export const getQuestionSchema = object({
  ...params,
});

export const updateQuestionSchema = object({
  ...params,
  body: object({
    title: string(),
    isMandatory: string(),
    quizId: string()
  }).partial(),
});

export const deleteQuestionSchema = object({
  ...params,
});

export type CreateQuestionInput = TypeOf<typeof createQuestionSchema>['body'];
export type GetQuestionInput = TypeOf<typeof getQuestionSchema>['params'];
export type UpdateQuestionInput = TypeOf<typeof updateQuestionSchema>;
export type DeleteQuestionInput = TypeOf<typeof deleteQuestionSchema>['params'];
