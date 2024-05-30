import { getAllContacts, getContactById } from "../services.js/contacts.js";

export const getContactsController = async (req, res) => {
    const contacts = await getAllContacts();

    res.json({
        status: 200,
        mesage: 'Successfully found contacts!',
        data: contacts
    }
    )
};

export const getContactByIdController = async (req, res) => {
    const { id } = req.params;
    console.log(req.params);
    const contact = await getContactById(id);

    res.json({
        status: 200,
        mesage: `Successfully found contact with id ${id}!`,
        data: contact
    }
    )
}
