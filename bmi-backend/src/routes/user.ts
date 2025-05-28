import { Router } from 'express';
import { getUser, updateUser } from '../controllers/userController';
import { auth } from '../middleware/auth';

const router = Router();

router.get('/', auth, getUser);
router.put('/', auth, updateUser);

export default router;
