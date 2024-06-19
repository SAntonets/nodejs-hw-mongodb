import { model, Schema } from 'mongoose';
import { ROLES } from '../constants/roles.js';

const usersSchema = new Schema(
  {
    name: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: [ROLES.CONTACTOWNER], default: ROLES.CONTACTOWNER },
  },
  { timestamps: true, versionKey: false },
);

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UsersCollection = model('users', usersSchema);



