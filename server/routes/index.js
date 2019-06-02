import { Router } from 'express';
import userRouter from './user';
import authRouter from './auth';

const baseRouter = Router();

baseRouter.use('/auth', authRouter);
baseRouter.use('/users', userRouter);

export default baseRouter;
