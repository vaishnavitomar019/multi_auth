import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../models/user.model';
import dotenv from 'dotenv';

dotenv.config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: "/api/google/callback"
},
  async (accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await User.findOne({ email: profile.emails?.[0].value });

      if (existingUser) {
        return done(null, existingUser);
      }

      const newUser = new User({
        username: profile.displayName,
        email: profile.emails?.[0].value,
        password: 'GOOGLE_AUTH_USER', // You can use empty string or flag here
      });

      await newUser.save();
      done(null, newUser);
    } catch (error) {
      done(error);
    }
  }
));

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
