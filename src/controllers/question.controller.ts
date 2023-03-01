import { NextFunction, Request, Response } from 'express';
import { Question } from '../entities/question.entity';
import {
  CreateQuestionInput,
  DeleteQuestionInput,
  GetQuestionInput,
  UpdateQuestionInput,
} from '../schemas/question.schema';
import { createQuestion, findQuestions, getQuestion } from '../services/question.service';
import { getQuiz } from '../services/quiz.service';
import { findUserById } from '../services/user.service';

export const createQuestionHandler = async (
  req: Request<{}, {}, CreateQuestionInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const quiz = await getQuiz(req.body.quizId);

    let obj:any = {
      title: req.body.title,
      isMandatory: req.body.isMandatory
    }
    const question = await createQuestion(obj, quiz!);

    res.status(201).json({
      status: 'success',
      data: {
        quiz,
      },
    });
  } catch (err: any) {
    if (err.code === '23505') {
      return res.status(409).json({
        status: 'fail',
        message: 'Unknown error occurred',
      });
    }
    next(err);
  }
};

export const getQuestionHandler = async (
  req: Request<GetQuestionInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const question = await getQuestion(req.params.questionId);

    if (!question) {
      return res.status(409).json({
        status: 'fail',
        message: 'Unknown error occurred',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        question,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getQuestionsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await findQuestions({}, {}, {});

    res.status(200).json({
      status: 'success',
      results: data.length,
      data: {
        data,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateQuestionHandler = async (
  req: Request<UpdateQuestionInput['params'], {}, UpdateQuestionInput['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getQuestion(req.params.questionId);

    if (!data) {
      return res.status(409).json({
        status: 'fail',
        message: 'Unknown error occurred',
      });
    }

    Object.assign(data, req.body);

    const updatedQuestion = await data.save();

    res.status(200).json({
      status: 'success',
      data: {
        quiz: updatedQuestion,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteQuestionHandler = async (
  req: Request<DeleteQuestionInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getQuestion(req.params.questionId);

    if (!data) {
      return res.status(409).json({
        status: 'fail',
        message: 'Unknown error occurred',
      });    }

    await data.remove();

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err: any) {
    next(err);
  }
};
