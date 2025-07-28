export interface User {
  _id?: string;
  username?: string;
  email: string;
  password?: string;       // Optional for Google users
  googleId?: string;       // Optional for Google users
  createdAt?: Date;
}
