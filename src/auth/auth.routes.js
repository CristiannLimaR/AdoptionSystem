import { Router } from "express";
import { check } from "express-validator";
import { login, register } from "./auth.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { existsEmail, isRoleValid } from "../helpers/db-validator.js";

const router = Router();

router.post(
    '/login',
    [
        check('email', 'Este no es un correo valido').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login
);

router.post(
    '/register',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe ser mayor a 6 carateres').isLength({min: 6}),
        check('email', 'Este no es un correo valido').isEmail(),
        check('email').custom(existsEmail),
        check('role').custom(isRoleValid),
        check('phone', 'El telefono tiene que tener 8 numeros').isLength({min: 8 , max: 8}),
        validarCampos


    ],
    register
)
export default router;