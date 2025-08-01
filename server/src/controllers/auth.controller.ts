import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt.util';
import { User } from '../models/user.model';

class AuthController {
  async register(req: Request, res: Response) {
    console.log(req.body);
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ username, email, password: hashedPassword });

      return res.status(201).json({
        message: "User registered",
        user: { id: newUser._id, username: newUser.username, email: newUser.email }
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user || !user.password) {
        return res.status(404).json({ message: "User not found or password is missing" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = generateToken({
        id: user._id,
        email: user.email,
        username: user.username,
      });

      return res.status(200).json({
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  async getProfile(req: Request, res: Response) {
    return res.json({
      message: "Welcome",
      user: (req as any).user,
    });
  }

  async googleCallback(req: Request, res: Response) {
    const user = (req as any).user;

    const token = generateToken({
      id: user._id,
      email: user.email,
      username: user.username,
    });
    const clientURL = process.env.CLIENT_URL
    return res.redirect(`${clientURL}/login/success?token=${token}`);
  }
}

export default new AuthController(); 
