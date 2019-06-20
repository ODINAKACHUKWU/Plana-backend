import { Router } from 'express';
import { signupUser, loginInUser } from '../controllers/auth';

const authRouter = Router();

authRouter.post('/signup', signupUser);
authRouter.post('/login', loginInUser);

export default authRouter;
