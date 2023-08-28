import { Schema, model } from 'mongoose';

import { Role } from '../utils/constants';

interface IUser {
  username: string;
  email: string;
  password: string;
  avatar?: string;
  role: string;
  status: boolean;
  google: boolean;
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, 'Username is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  avatar: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    emun: [Role.ADMIN, Role.USER],
  },
  status: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

export const User = model<IUser>('User', UserSchema);
