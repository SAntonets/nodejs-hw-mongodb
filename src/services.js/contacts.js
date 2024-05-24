

import { Schema, model } from 'mongoose';

const contactsSchema = new Schema(
  {
    name: {
        type: String,
        required: true,
        },
    phoneNumber: {
        type: String,
        required: true,
        },
    email: {
        type: String,
        required: false,
        },
    isFavourite: {
        type: Boolean,
        required: false,
        default: false,
        },
    contactType: {
        type: String,
        required: true,
        default: 'personal',
        enum: ['work', 'home', 'personal'],
        },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const contactsCollection = model('contacts', contactsSchema);


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
