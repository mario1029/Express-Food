import { Router } from 'express';
import session from './session';
import users from './users';
import premisses from './premisses';
import product from './product';
import file from './files';
import order from './order';
import payment from './payment';
import { isAuth } from '@validations/auth';
const router = Router();

router.use('/session', session);
router.use('/users', users);
router.use('/premisses',isAuth, premisses);
router.use('/product',isAuth, product);
router.use('/file',isAuth, file);
router.use('/order',isAuth, order);
router.use('/payment',isAuth, payment);

export default router;
