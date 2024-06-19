import createHttpError from "http-errors";

import { contactsCollection } from "../db/models/contact";
import { ROLES } from "../constants";


export const checkRoles = (...roles) => async (req, res, next) => {
    const { user } = req;
    if (!user) {
        next(createHttpError(401));
        return;
    }

    const { role } = user;
    if (roles.includes(ROLES.CONTACTOWNER) && role === ROLES.CONTACTOWNER) {
        next();
        return;
    }

    const contact = await contactsCollection.findOne({ _id: contact._id, ownerID: user._id });

    if (contact) {
        next();
        return;
    }
    next(createHttpError(403));
}
