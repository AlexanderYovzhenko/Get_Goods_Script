import express, { Request, Response } from 'express';
import { getAllArticles } from '../services';

const articlesRouter = express.Router();

articlesRouter.get('/', (_: Request, res: Response) => {
  res.json({ message: 'Server is running!' });
});

articlesRouter.get('/articles', async (_: Request, res: Response) => {
  try {
    const articles = await getAllArticles();

    res.send({ articles });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while fetching articles.' });
  }
});

export { articlesRouter };
