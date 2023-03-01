import { Entity, Column, Index, OneToMany } from 'typeorm';
import Model from './model.entity';
import { Quiz } from './quiz.entity';

@Entity('users')
export class User extends Model {
  @Column()
  name: string;

  @Index('email_index')
  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    default: false,
  })
  verified: boolean;

  @OneToMany(() => Quiz, (quiz) => quiz.user)
  quizzes: Quiz[];

}
