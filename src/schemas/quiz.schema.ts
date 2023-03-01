import { object, string, TypeOf } from 'zod';

export const createQuizSchema = object({
  body: object({
    title: string({
      required_error: 'Title is required',
    }),
    content: string({
      required_error: 'Content is required',
    })
  }),
});

const params = {
  params: object({
    quizId: string(),
  }),
};

export const getQuizSchema = object({
  ...params,
});

export const updateQuizSchema = object({
  ...params,
  body: object({
    title: string(),
    content: string()
  }).partial(),
});

export const deleteQuizSchema = object({
  ...params,
});

export type CreateQuizInput = TypeOf<typeof createQuizSchema>['body'];
export type GetQuizInput = TypeOf<typeof getQuizSchema>['params'];
export type UpdateQuizInput = TypeOf<typeof updateQuizSchema>;
export type DeleteQuizInput = TypeOf<typeof deleteQuizSchema>['params'];
