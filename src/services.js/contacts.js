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
    }
}


export const createContact = async (payload) => {
  const contact = await contactsCollection.create(payload);
    return contact;
}

export const patchContact = async (id, payload, options = {}) => {
    try {
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
    } catch (error) {
    }
};




export const deleteContact = async (id) => {
    try {
        const contactToDelete = await contactsCollection.findOneAndDelete({ _id: id, });

        return contactToDelete.value;
    } catch (error) {
    }
}
