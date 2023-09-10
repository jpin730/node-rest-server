import { OAuth2Client, TokenPayload } from 'google-auth-library';

const client = new OAuth2Client();

export const googleVerify = async (token: string) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const {
    name = '',
    picture = '',
    email = '',
  } = ticket.getPayload() as TokenPayload;

  return { username: name, avatar: picture, email };
};
