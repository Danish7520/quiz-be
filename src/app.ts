require('dotenv').config();
import express from 'express';
import config from 'config';
import { AppDataSource } from './utils/data-source';
import userRouter from './routes/user.routes';
import quizRouter from './routes/quiz.routes';


AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(express.json());


    // app.use(
    //   cors({
    //     origin: config.get<string>('origin'),
    //     credentials: true,
    //   })
    // );

    // ROUTES
    app.use('/api/users', userRouter);
    app.use('/api/quizzes', quizRouter);

    const port = config.get<number>('port');
    app.listen(port);
    console.log(`Server started with pid: ${process.pid} on port: ${port}`);
  })
  .catch((error) => console.log(error));
