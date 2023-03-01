import {
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
} from 'typeorm';
import { Question } from '../entities/question.entity';
import { Quiz } from '../entities/quiz.entity';
import { AppDataSource } from '../utils/data-source';

const questionRepository = AppDataSource.getRepository(Question);

export const createQuestion = async (input: Partial<Question>, quiz: Quiz) => {
  return await questionRepository.save(questionRepository.create({ ...input, quiz }));
};

export const getQuestion = async (questionId: string) => {
  return await questionRepository.findOneBy({ id: questionId });
};

export const findQuestions = async (
  where: FindOptionsWhere<Question> = {},
  select: FindOptionsSelect<Question> = {},
  relations: FindOptionsRelations<Question> = {}
) => {
  return await questionRepository.find({
    where,
    select,
    relations,
  });
};
