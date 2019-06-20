import { Router } from 'express';
import authRouter from './auth';

const baseRouter = Router();

baseRouter.use('/auth', authRouter);

export default baseRouter;
