import { createContact, getAllContacts, getContactById, deleteContact, patchContact } from "../services.js/contacts.js";
import createHttpError from "http-errors";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";

export const getContactsController = async (req, res) => {
        const { page, perPage } = parsePaginationParams(req.query);
        const contacts = await getAllContacts({
            page,
            perPage
        });

        res.json({
            status: 200,
            mesage: 'Successfully found contacts!',
            data: contacts
        }
        )
}

export const getContactByIdController = async (req, res, next) => {
    const { id } = req.params;
    const contact = await getContactById(id);

    if (!contact) {
        next(createHttpError(404, 'Contact not found!'));
        return;
    }

    res.json({
        status: 200,
        message: `Successfully found contact with id ${id}!`,
        data: contact
    }
    )
}

export const createContactController = async (req, res) => {
    const contact = await createContact(req.body);
    res.status(201).json({
        status: 201,
        message: 'Successfully created a contact!',
        data: contact
    }
    );
}

export const patchContactController = async (req, res, next) => {
    const { id } = req.params;
    const result = await patchContact(id, req.body);

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
    const { id } = req.params;

    const contact = await deleteContact(id);

    if (!contact) {
        next(createHttpError(404, 'Contact not found!'));
        return;
    }

    res.status(204).send()
}
