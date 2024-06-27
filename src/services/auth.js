import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';

import { UsersCollection } from '../db/models/user.js';
import { SessionsCollection } from '../db/models/session.js';
import { FIFTEEN_MINUTES, ONE_DAY, SMTP } from '../constants/index.js';
import { env } from '../utils/env.js';
import { sendEmail } from '../utils/sendMail.js';

export const registerUser = async (payload) => {
const user = await UsersCollection.findOne({ email: payload.email });
if (user) throw createHttpError(409, 'Email in use');

const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return await UsersCollection.create({
    ...payload,
    password: encryptedPassword
  });
};

export const loginUser = async ( payload ) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const isEqual = await bcrypt.compare(payload.password, user.password);


  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }

  await SessionsCollection.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  const userId = user._id;

  return await SessionsCollection.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });

};


export const logoutUser = async (sessionID) => {
  await SessionsCollection.deleteOne({ _id: sessionID });
};


const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  };
};


export const refreshUsersSession = async ({ sessionID, refreshToken }) => {


   const session = await SessionsCollection.findOne({_id: sessionID, refreshToken: refreshToken});

  if(!session) {
    throw createHttpError(401, 'Session not found');
  }

  if(session.refreshTokenValidUntil < new Date()) {
    throw createHttpError(401, 'Refresh token expired');
  }


  const user = await UsersCollection.findById(session.userId);


  if(!user) {
    throw createHttpError(401, 'User not found');
  }

  await SessionsCollection.deleteOne({ _id: session._id });

  return await SessionsCollection.create({
    ...createSession(),
    userId: user._id,
  })
};


export const requestResetToken = async (email) => {
  const user = await UsersCollection.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const resetToken = jwt.sign(
    {
      sub: user._id,
      email,
    },
    env('JWT_SECRET'),
    {
      expiresIn: '15m',
    },
  );

  await sendEmail({
    from: env(SMTP.SMTP_FROM),
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${resetToken}">here</a> to reset your password!</p>`,
  });
};


