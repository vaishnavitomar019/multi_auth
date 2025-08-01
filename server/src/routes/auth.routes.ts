import { Router } from 'express';
import passport from 'passport';
import { verifyToken } from '../middleware/auth.middleware';
import authController from '../controllers/auth.controller';

class AuthRoutes{
public router=Router();
  
   constructor(){
    this.router=Router();
    this.initializeRoutes();
   }

   private initializeRoutes(){
     this.router.post('/register', authController.register);
     this.router.post('/login',authController.login);
     this.router.get('/profile',verifyToken,authController.getProfile);
     this.router.get('/google',passport.authenticate('google',{scope:['profile','email']}));
     this.router.get('/google/callback',passport.authenticate('google',{failureRedirect:'/login',session:false}),authController.googleCallback);
   }
}

export default  new AuthRoutes().router;

