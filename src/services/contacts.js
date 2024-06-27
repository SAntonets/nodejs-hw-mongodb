
import { SORT_ORDER } from "../constants/index.js";
import { contactsCollection } from "../db/models/contact.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";



export const getAllContacts = async ({
    page = 1,
    perPage = 10,
    sortOrder = SORT_ORDER.ASC,
    sortBy = '_id',
    filter = {},
    userId,
}) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery = contactsCollection.find();

        if (filter.type) {
            contactsQuery
                .where('contactType')
                .equals(filter.type);
        }

        if (filter.isFavourite) {
            contactsQuery
                .where('isFavourite')
                .equals(filter.isFavourite);
        }

        contactsQuery.where('userId').equals(userId);



    const contactsCount = await contactsCollection.find().merge(contactsQuery).countDocuments();

    const contacts = await contactsQuery
        .skip(skip)
        .limit(limit)
        .sort({ [sortBy]: sortOrder })
        .exec();


    const paginationData = calculatePaginationData(contactsCount, perPage, page);

    return { data: contacts, ...paginationData };
}

export const getContactById = async (contactId, userId) => {
    try {

        const contact = contactsCollection.findOne({ _id: contactId });

        contact.where('userId').equals(userId);


        return contact;
    } catch (error) {
    }
}


export const createContact = async (req, photoUrl) => {


  const contact = await contactsCollection.create({
    ...req.body,
    userId: req.user._id,
    photo: photoUrl,
});
    return contact;
}

export const patchContact = async (id, payload, options = {}) => {
    try {

    const rawResult = await contactsCollection.findOneAndUpdate(
        {userId: id.userId, _id: id.contactId},
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
        const contactToDelete = await contactsCollection.findOneAndDelete({ userId: id.userId, _id: id.contactId });

        return contactToDelete;
    } catch (error) {
    }
}
