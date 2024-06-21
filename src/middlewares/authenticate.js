import createHttpError from "http-errors";
import { SessionsCollection } from "../db/models/session.js";
import { UsersCollection } from "../db/models/user.js";

export const authenticate = async (req, res, next) => {

    const header = req.get('Authorization');

    if (!header) {
       return next(createHttpError(401, 'Authorization header not found'));
    }

    const [bearer, token] = header.split(' ');

    if (bearer !== 'Bearer' || !token) {
        return next(createHttpError(401, 'Authorization header should be of bearer type'));
    }

    const session = await SessionsCollection.findOne({ accessToken: token });

    if (!session) {
        return next(createHttpError(401, 'Session not found'));
    }

    if (session.accessTokenValidUntil < new Date()) {
        return next(createHttpError(401, 'Access token expired'));
    }

    const user = await UsersCollection.findById(session.userId);

    if (!user) {
        return next(createHttpError(401, 'User not found'));
    }

    req.user = user;

    return next();
  };
