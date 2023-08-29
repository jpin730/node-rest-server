import { Category } from '../models/category';
import { Role } from '../models/role';
import { User } from '../models/user';

export const isValidRole = async (role: string) => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists) {
    throw new Error('Role value is invalid');
  }
};

export const emailDoesNotExists = async (email: string) => {
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new Error('Email already exists');
  }
};

export const userExist = async (id: string) => {
  try {
    const userExists = await User.findById(id);
    if (!userExists) {
      throw new Error();
    }
  } catch {
    throw new Error("User doesn't exist");
  }
};

export const categoryExists = async (id: string) => {
  try {
    const categoryExists = !!(await Category.findById(id));
    if (!categoryExists) {
      throw new Error();
    }
  } catch {
    throw new Error("Category doesn't exist");
  }
};
