
import { SORT_ORDER } from "../constants/index.js";
import { contactsCollection } from "../db/models/contact.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";



export const getAllContacts = async ({ page = 1, perPage = 10, sortOrder = SORT_ORDER.ASC, sortBy = '_id' }) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery = contactsCollection.find();
    const contactsCount = await contactsCollection.find().
    merge(contactsQuery).countDocuments();


        const contacts = await contactsQuery
            .skip(skip)
            .limit(limit)
            .sort({ [sortBy]: sortOrder })
            .exec();

        const paginationData = calculatePaginationData(contactsCount, perPage, page);

        return {data: contacts, ...paginationData};
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
        const contactToDelete = await contactsCollection.findOneAndDelete({ _id: id });

        return contactToDelete;
    } catch (error) {
    }
}
