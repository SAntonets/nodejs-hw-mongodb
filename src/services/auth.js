import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import createHttpError from 'http-errors';

import { UsersCollection } from '../db/models/user.js';
import { SessionsCollection } from '../db/models/session.js';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/index.js';

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

  await SessionsCollection.deleteOne({ userID: user._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return await SessionsCollection.create({
    userID: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });

};


export const logoutUser = async (sessionID) => {
  await SessionsCollection.deleteOne({ _id: sessionID });
};


const createSession = async () => {
  return {
    accessToken: randomBytes(30).toString('base64'),
    refreshToken: randomBytes(30).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  };

};


export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
   const session = await SessionsCollection.findOne({_id: sessionId, refreshToken: refreshToken});

  if(!session) {
    throw createHttpError(401, 'Session not found');
  }

  if(session.refreshTokenValidUntil < new Date()) {
    throw createHttpError(401, 'Refresh token expired');
  }

  const user = await UsersCollection.findById(session.userID);

  if(!user) {
    throw createHttpError(401, 'User not found');
  }

  await SessionsCollection.deleteOne({ _id: session._id });

  return await SessionsCollection.create({
    ...createSession(),
    userID: user._id,
  })



};
