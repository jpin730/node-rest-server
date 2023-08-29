import bcrypt from 'bcryptjs';

export const encrypt = (password: string) => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
};
