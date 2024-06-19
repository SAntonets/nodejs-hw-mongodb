

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
        required: false,
        default: 'personal',
        enum: ['work', 'home', 'personal'],
        },
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    }
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const contactsCollection = model('contacts', contactsSchema);
