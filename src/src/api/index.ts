import { Router } from 'express';
import userRouter from './user/router';
import moralisRouter from './moralis/router';
import sharesRouter from './shares/router';

export default (): Router => {
  const app = Router();

  app.use('/user', userRouter);
  app.use('/moralis', moralisRouter);
  app.use('/shares', sharesRouter);

  return app;
};
