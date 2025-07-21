import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', verifyToken, (req, res) => {
  res.json({ message: "Welcome", user: (req as any).user });
});

export default router;
