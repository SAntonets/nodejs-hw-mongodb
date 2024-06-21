import Joi from 'joi';

export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required().messages({
        'string.base': 'Name must be a type of string',
        'string.min': 'Name must be at least 3 characters long',
        'string.max': 'Name must be at most 20 characters long',
        'any.required': 'Name is required',

    }),
    phoneNumber: Joi.string().min(3).max(20).required().messages({
        'string.base': 'Phone number must be a type of string',
        'string.min': 'Phone number must be at least 3 characters long',
        'string.max': 'Phone number must be at most 20 characters long',
        'any.required': 'Phone number is required',
    }),
    email: Joi.string().email().messages({
        'string.email': 'Email must be a type of string and must be a valid email',
    }),
    isFavourite: Joi.boolean().messages({
        'boolean.base': 'Is favourite must be a type of boolean',
    }),
    contactType: Joi.string().valid('work', 'home', 'personal').messages({
        'string.base': 'Contact type must be a type of string',
        'any.only': 'Contact type must be one of the following values: work, home, personal',
        'any.required': 'Contact type is required',
    })
})


export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).messages({
        'string.base': 'Name must be a type of string',
        'string.min': 'Name must be at least 3 characters long',
        'string.max': 'Name must be at most 20 characters long',
        'any.required': 'Name is required',
    }),
    phoneNumber: Joi.string().min(3).max(20).messages({
        'string.base': 'Phone number must be a type of string',
        'string.min': 'Phone number must be at least 3 characters long',
        'string.max': 'Phone number must be at most 20 characters long',
        'any.required': 'Phone number is required',
    }),
    email: Joi.string().email().messages({
        'string.email': 'Email must be a type of string and must be a valid email',
    }),
    isFavourite: Joi.boolean().messages({
        'boolean.base': 'Is favourite must be a type of boolean',
    }),
    contactType: Joi.string().valid('work', 'home', 'personal').messages({
        'string.base': 'Contact type must be a type of string',
        'any.only': 'Contact type must be one of the following values: work, home, personal',
        'any.required': 'Contact type is required',
    }),
})
