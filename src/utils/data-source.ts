require('dotenv').config();
import { DataSource } from 'typeorm';
import config from 'config';

const mysqlConfig = config.get<{
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}>('mysqlConfig');

export const AppDataSource = new DataSource({
  ...mysqlConfig,
  type: 'mysql',
  synchronize: false,
  logging: false,
  entities: [__dirname + '/../**/*.entity.js'],
  migrations: ['src/migrations/**/*{.ts,.js}']
});
