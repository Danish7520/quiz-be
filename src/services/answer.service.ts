import {
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
} from 'typeorm';
import { Answer } from '../entities/answer.entity';
import { Question } from '../entities/question.entity';
import { AppDataSource } from '../utils/data-source';

const answerRepository = AppDataSource.getRepository(Answer);

export const createAnswer = async (input: Partial<Answer>, question: Question) => {
  return await answerRepository.save(answerRepository.create({ ...input, question }));
};

export const getAnswer = async (answerId: string) => {
  return await answerRepository.findOneBy({ id: answerId });
};

export const findAnswers = async (
  where: FindOptionsWhere<Answer> = {},
  select: FindOptionsSelect<Answer> = {},
  relations: FindOptionsRelations<Answer> = {}
) => {
  return await answerRepository.find({
    where,
    select,
    relations,
  });
};
