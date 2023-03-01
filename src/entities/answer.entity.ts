import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import Model from './model.entity';
import { Question } from './question.entity';

@Entity('answers')
export class Answer extends Model {
  @Column({
  })
  title: string;

  @Column({
    default: false
  })
  isAnswer: boolean;

  @ManyToOne(() => Question, (question) => question.answer)
  @JoinColumn()
  question: Question;
}
