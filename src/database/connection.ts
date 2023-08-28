import { Sequelize } from 'sequelize-typescript';
import { Proxy } from '../models';

const connection = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  models: [Proxy],
});

export { connection };
