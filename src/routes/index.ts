import { Router } from 'express';
import session from './session';
import users from './users';
import premisses from './premisses';
import product from './product'
import { isAuth } from '@validations/auth';
const router = Router();

router.use('/session', session);
router.use('/users', users);
router.use('/premisses',isAuth, premisses);
router.use('/product',isAuth, product);
export default router;
