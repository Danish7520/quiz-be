import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import Model from './model.entity';
import { Question } from './question.entity';
import { User } from './user.entity';

@Entity('quizzes')
export class Quiz extends Model {
  @Column({
  })
  title: string;

  @Column()
  content: string;

  @Column({
    default: false
  })
  draft: boolean;

  @ManyToOne(() => User, (user) => user.quizzes)
  @JoinColumn()
  user: User;

  @OneToMany(() => Question, (question) => question.quiz)
  questions: Question[];
}
