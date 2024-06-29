import { createContact, getAllContacts, getContactById, deleteContact, patchContact } from "../services/contacts.js";
import createHttpError from "http-errors";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";
import { saveFileToUploadDir } from "../utils/saveFileToUploadDir.js";
import { env } from "../utils/env.js";
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";

export const getContactsController = async (req, res) => {
        const { page, perPage } = parsePaginationParams(req.query);
        const { sortBy, sortOrder} = parseSortParams(req.query);
        const filter = parseFilterParams(req.query);


        const contacts = await getAllContacts({
            page,
            perPage,
            sortBy,
            sortOrder,
            filter,
            userId: req.user._id,
        });

        res.json({
            status: 200,
            mesage: 'Successfully found contacts!',
            data: contacts
        }
        )
}

export const getContactByIdController = async (req, res, next) => {
    const contactId = req.params.id;
    const userId = req.user._id;
    const contact = await getContactById(contactId, userId);

    if (!contact) {
        next(createHttpError(404, 'Contact not found!'));
        return;
    }

    res.json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact
    }
    )
}

export const createContactController = async (req, res) => {
    const photo = req.file;

    let photoUrl;

    if (photo) {
        if (env('ENABLE_CLOUDINARY') === 'true') {
          photoUrl = await saveFileToCloudinary(photo);
        } else {
          photoUrl = await saveFileToUploadDir(photo);
        }
      }



    const contact = await createContact(req, photoUrl);
    res.status(201).json({
        status: 201,
        message: 'Successfully created a contact!',
        data: contact
    }
    );
}

export const patchContactController = async (req, res, next) => {
    const contactId  = req.params.id;
    const userId = req.user._id;
    const photo = req.file;

    let photoUrl;

    if (photo) {
        if (env('ENABLE_CLOUDINARY') === 'true') {
          photoUrl = await saveFileToCloudinary(photo);
        } else {
          photoUrl = await saveFileToUploadDir(photo);
        }
      }

    const id = { contactId: contactId, userId: userId };

    const result = await patchContact(id, {...req.body, photo: photoUrl}, userId);

    if (!result) {
        next(createHttpError(404, 'Contact not found!'));
        return;
    }

    res.status(200).json({
        status: 200,
        message: 'Successfully patched a contact!',
        data: result.contact
    }
    )
};


export const deleteContactController = async (req, res, next) => {
    const id = {contactId: req.params.id, userId: req.user._id};

    const contact = await deleteContact(id);

    if (!contact) {
        next(createHttpError(404, 'Contact not found!'));
        return;
    }

    res.status(204).send()
}
