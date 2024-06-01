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

export const patchContact = async (id, payload, options = {}) => {
    const rawResult = await contactsCollection.findOneAndUpdate(
        { _id: id },
        payload,
        {
            new: true,
            includeResultMetadata: true,
            ...options,
        },
    );

    if (!rawResult || !rawResult.value) return null;

    return {
        contact: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
};




export const deleteContact = async (id) => {
    const student = await contactsCollection.findOneAndDelete({ _id: id });
    return student;
}
