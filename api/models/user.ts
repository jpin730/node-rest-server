import { Schema, model } from 'mongoose';
import { RolesEnum } from '../utils/constants';

export interface IUser {
  username: string;
  email: string;
  password: string;
  role: RolesEnum;
  status: boolean;
  google: boolean;
  avatar?: string;
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
  },
});

UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.__v;
  delete user.password;
  delete user.status;
  user.uid = user._id;
  delete user._id;
  return user;
};

export const User = model<IUser>('User', UserSchema);
