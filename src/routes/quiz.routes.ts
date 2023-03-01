import express from 'express';
import {
  createQuizHandler,
  deleteQuizHandler,
  getQuizHandler,
  getQuizzesHandler,
  updateQuizHandler
} from '../controllers/quiz.controller';

const router = express.Router();

router
  .route('/')
  .post(
    createQuizHandler
  )
  .get(getQuizHandler);

router
  .route('/:quizId')
  .get(getQuizHandler)
  .patch(updateQuizHandler)
  .delete(deleteQuizHandler);

export default router;
