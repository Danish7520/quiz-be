import {
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
  Relation,
  RelationOptions,
} from 'typeorm';
import { Quiz } from '../entities/quiz.entity';
import { User } from '../entities/user.entity';
import { AppDataSource } from '../utils/data-source';

const quizRepository = AppDataSource.getRepository(Quiz);

export const createQuiz = async (input: Partial<Quiz>, user: User) => {
  return await quizRepository.save(quizRepository.create({ ...input, user }));
};

export const getQuiz = async (quizId: string) => {
  return await quizRepository.findOneBy({ id: quizId });
};

export const findQuizzes = async (
  where: FindOptionsWhere<Quiz> = {},
  select: FindOptionsSelect<Quiz> = {},
  relations: FindOptionsRelations<Quiz> = {}
) => {
  return await quizRepository.find({
    where,
    select,
    relations,
  });
};
