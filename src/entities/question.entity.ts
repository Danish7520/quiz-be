import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Answer } from './answer.entity';
import Model from './model.entity';
import { Quiz } from './quiz.entity';

@Entity('questions')
export class Question extends Model {
  @Column({
  })
  title: string;

  @Column({
    default: false
  })
  isMandatory: boolean;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  @JoinColumn()
  quiz: Quiz;

  @OneToMany(() => Answer, (answer) => answer.question)
  answer: Answer[];
}
