import { contactsCollection } from "../db/models/contact.js";



export const getContacts = async () => {
    try {
        const contacts = await contactsCollection.find();
        return contacts;
    } catch (error) {
        console.log(error);
    }
}

export const getContactById = async (id) => {
    try {
        const contact = await contactsCollection.findById(id);
        return contact;
    } catch (error) {
        console.log(error);
    }
}
