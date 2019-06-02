import { Router } from 'express';
import { getUsers } from '../controllers/user';

const userRouter = Router();

userRouter.get('/', getUsers);

export default userRouter;
