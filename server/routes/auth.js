import { Router } from 'express';
import { getUsers, addUser } from '../controllers/user';

const authRouter = Router();

authRouter.post('/login', getUsers);
authRouter.post('/signup', addUser);

export default authRouter;
