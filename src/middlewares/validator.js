import {body } from 'express-validator'
import { validateFields } from './validate-fields.js'
import { existsEmail, isRoleValid } from '../helpers/db-validator.js'

export const registerValidator = [
    body('name', 'The name is required').not().isEmpty(),
    body('surname', 'The surname is required').not().isEmpty(),
    body('email', "You must enter a valid email").isEmail(),
    body('role').custom(isRoleValid),
    body('email').custom(existsEmail),
    body('password', 'Password must be at least 8 characters').isLength({min: 8}),
    validateFields
];

export const loginValidator = [
    body('email').optional().isEmail().withMessage("Enter a valid email address"),
    body('username').optional().isEmail().isString().withMessage("Enter a valid username"),
    body('password', 'Password must be at least 8 characters').isLength({min: 8}),
    validateFields
]

export const appointmentValidator = [
    body('date').isDate({format: 'MM/DD/YYYY'}).withMessage('Must be a valid date format (MM/DD/YYYY)'),
    body('time').isTime({ format: 'HH:mm' }).withMessage('Must be a valid time format (HH:mm)'),
    validateFields
]