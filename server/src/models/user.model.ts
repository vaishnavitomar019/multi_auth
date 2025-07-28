import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: { type: String }, // optional for Google users
    email: { type: String, unique: true, required: true },
    password: { type: String }, // optional for Google users
    googleId: { type: String }, // used only for Google login
    profilePic: { type: String }, // optional: from Google profile
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);





