import { SignCallback, SignOptions, sign } from 'jsonwebtoken';

export const generateJWT = (uid: string, expiresIn: '1h' | '2h') =>
  new Promise((resolve, reject) => {
    const payload = { uid };
    const secret = process.env.JWT_SECRET as string;
    const options: SignOptions = { expiresIn };
    const callback: SignCallback = (err, token) =>
      err ? reject('Failed to generate token') : resolve(token);

    sign(payload, secret, options, callback);
  });
