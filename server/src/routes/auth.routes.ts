import { Router } from 'express';
import passport from 'passport';
import { register, login } from '../controllers/auth.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();

// Email/Password Auth
router.post('/register', register);
router.post('/login', login);
router.get('/profile', verifyToken, (req, res) => {
  res.json({ message: "Welcome", user: (req as any).user });
});

// Google Auth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    session: false
  }),
  (req, res) => {
    // Generate JWT for user
    const user = (req as any).user;
    const jwt = require('jsonwebtoken');
    const token = jwt.sign({ id: user._id, email: user.email,username:user.username }, process.env.JWT_SECRET!, {
      expiresIn: '1d'
    });


    res.redirect(`http://localhost:4200/login/success?token=${token}`);
 
  }
);

export default router;
