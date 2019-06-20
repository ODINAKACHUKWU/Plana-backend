import { Router } from 'express';
import signupUser from '../controllers/auth';

const authRouter = Router();

authRouter.post('/signup', signupUser);

export default authRouter;
