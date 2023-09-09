import { genSaltSync, hashSync } from 'bcryptjs';

export const encrypt = (password: string) => {
  const salt = genSaltSync();
  return hashSync(password, salt);
};
