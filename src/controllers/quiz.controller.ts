import { NextFunction, Request, Response } from 'express';
import {
  CreateQuizInput,
  DeleteQuizInput,
  GetQuizInput,
  UpdateQuizInput,
} from '../schemas/quiz.schema';
import { createAnswer } from '../services/answer.service';
import { createQuestion } from '../services/question.service';
import { createQuiz, findQuizzes, getQuiz } from '../services/quiz.service';
import { findUserById } from '../services/user.service';

export const createQuizHandler = async (
  req: Request<{}, {}, any>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await findUserById(req.body.userId as string);

    const quiz: any = await createQuiz(req.body.quiz, user!);

    req.body.questions.forEach(async (question: any) => {
      const questionObj: any = {
        title: question.title,
        isMandatory: question.isMandatory
      }
      const questionResp = await createQuestion(questionObj, quiz!);
      question.answers.forEach(async(answer: any) => {
        const answerObj: any ={
          title: answer.title,
          isAnswer: answer.isAnswer
        }
        await createAnswer(answerObj, questionResp)
      })
    })


    
    res.status(201).json({
      status: 'success',
      data: {
        quiz
      },
    });
  } catch (err: any) {
    if (err.code === '23505') {
      return res.status(409).json({
        status: 'fail',
        message: 'Quiz with that title already exist',
      });
    }
    next(err);
  }
};

export const getQuizHandler = async (
  req: Request<GetQuizInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const quiz = await getQuiz(req.params.quizId);

    if (!quiz) {
      return res.status(409).json({
        status: 'fail',
        message: 'Quiz with that title already exist',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        quiz,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getQuizzesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const quizzes = await findQuizzes({}, {}, {});

    res.status(200).json({
      status: 'success',
      results: quizzes.length,
      data: {
        quizzes,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateQuizHandler = async (
  req: Request<UpdateQuizInput['params'], {}, UpdateQuizInput['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const quiz = await getQuiz(req.params.quizId);

    if (!quiz) {
      return res.status(409).json({
        status: 'fail',
        message: 'Quiz with that title already exist',
      });
    }

    Object.assign(quiz, req.body);

    const updatedQuiz = await quiz.save();

    res.status(200).json({
      status: 'success',
      data: {
        quiz: updatedQuiz,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteQuizHandler = async (
  req: Request<DeleteQuizInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const quiz = await getQuiz(req.params.quizId);

    if (!quiz) {
      return res.status(409).json({
        status: 'fail',
        message: 'Quiz with that title already exist',
      });    }

    await quiz.remove();

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err: any) {
    next(err);
  }
};
