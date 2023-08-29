import { SignCallback, SignOptions, sign } from 'jsonwebtoken';

export const generateJWT = (uid: string) =>
  new Promise((resolve, reject) => {
    const payload = { uid };
    const secret = process.env.JWT_SECRET as string;
    const options: SignOptions = { expiresIn: '1h' };
    const callback: SignCallback = (err, token) =>
      err ? reject('Failed to generate token') : resolve(token);

    sign(payload, secret, options, callback);
  });
