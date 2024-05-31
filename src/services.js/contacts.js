import { contactsCollection } from "../db/models/contact.js";



export const getAllContacts = async () => {
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


export const createContact = async (payload) => {
  const contact = await contactsCollection.create(payload);
    return contact;
}


export const deleteContact = async (id) => {
    const student = await contactsCollection.findByIdAndDelete({ _id: id });
    return student;
}
