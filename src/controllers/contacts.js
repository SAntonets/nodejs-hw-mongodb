import { getAllContacts, getContactById } from "../services.js/contacts.js";

export const getContactsController = async (req, res) => {
    try {
        const contacts = await getAllContacts();

        res.json({
            status: 200,
            mesage: 'Successfully found contacts!',
            data: contacts
        }
        )
    } catch (error) {
        next(error)
    };

}

export const getContactByIdController = async (req, res, next) => {
    const { id } = req.params;
    const contact = await getContactById(id);

    if (!contact) {
        next(new Error(`Contact with id ${id} not found!`));
        return;
    }


    res.json({
        status: 200,
        mesage: `Successfully found contact with id ${id}!`,
        data: contact
    }
    )
}
