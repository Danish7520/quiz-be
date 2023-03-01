import express from 'express';
import {
  createQuestionHandler,
  deleteQuestionHandler,
  getQuestionHandler,
  updateQuestionHandler
} from '../controllers/question.controller';

const router = express.Router();

router
  .route('/')
  .post(
    createQuestionHandler
  )
  .get(getQuestionHandler);

router
  .route('/:questionId')
  .get(getQuestionHandler)
  .patch(updateQuestionHandler)
  .delete(deleteQuestionHandler);

export default router;
