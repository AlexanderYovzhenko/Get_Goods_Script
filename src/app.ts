import express, { Express } from 'express';
import * as bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { connection } from './database';
import { articlesRouter } from './routers';
import { addAllProxy } from './services';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(express.json());

app.use('/', articlesRouter);

const startApp = async (): Promise<void> => {
  try {
    await connection.sync();
    app.listen(port, () => {
      console.info(`⚡️ Server is running at http://localhost:${port}`);
    });

    // Заполняем таблицу Proxy тестовыми данными
    await addAllProxy();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void startApp();
