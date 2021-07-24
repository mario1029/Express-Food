import { Router } from 'express';
import session from './session';
import users from './users';
import { isAuth } from '@validations/auth';
const router = Router();

router.use('/session', session);
router.use('/users', users);
export default router;
