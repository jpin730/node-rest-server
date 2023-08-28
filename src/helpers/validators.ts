import { Role } from '../models/role';
import { User } from '../models/user';

export const isValidRole = async (role: string) => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists) {
    throw new Error('Role value is invalid');
  }
};

export const emailExists = async (email: string) => {
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new Error('Email already exists');
  }
};
