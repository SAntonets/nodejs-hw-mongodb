import { ONE_DAY } from '../constants/index.js';
import { logoutUser, refreshUsersSession, registerUser, requestResetToken, resetPassword } from '../services/auth.js';
import { loginUser } from '../services/auth.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY)
  });
  res.cookie('sessionID', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY)
  })

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionID) {
    await logoutUser(req.cookies.sessionID);
  }

  res.clearCookie('refreshToken');
  res.clearCookie('sessionID');

  res.status(204).send();
}



export const refreshUserSessionController = async (req, res, next) => {

  const sessionID = req.cookies.sessionID;
  const refreshToken = req.cookies.refreshToken;

  const session = await refreshUsersSession({
    sessionID,
    refreshToken
  });

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY)
  });
  res.cookie('sessionID', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY)
  })

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });

};


export const requestResetEmailController = async (req, res) => {
  await requestResetToken(req.body.email);
  res.json({
    status: 200,
    message: 'Reset password email has been successfully sent.',
    data: {},
  });
};


export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);
  res.json({
    message: 'Password was successfully reset!',
    status: 200,
    data: {},
  });
};
