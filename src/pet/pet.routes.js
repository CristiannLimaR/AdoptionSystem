import { Router } from "express";
import {check} from "express-validator"
import { deletePet, getPets, savePet, searchPet, updatePet } from "./pet.controller.js";
import { validateFields } from "../middlewares/validate-fields.js";
import { validateJWT } from "../middlewares/validate-jwt.js";

const router = Router();

router.post(
    "/",
    [
        validateJWT,
        check('email','Este no es un correo valido').not().isEmpty(),
        validateFields
    ],
    savePet
)

router.get(
    "/",
    getPets
)

router.get(
    "/:id",
    [
        validateJWT,
        check('id', 'no es un ID valido').isMongoId(),
        validateFields
    ],
    searchPet
)

router.put(
    "/:id",
    [   
        validateJWT,
        check("id", "No es un ID valido").isMongoId(),
        validateFields
    ],
    updatePet
)

router.delete(
    "/:id",
    [   
        validateJWT,
        check("id", "No es un ID valido").isMongoId(),
        validateFields
    ],
    deletePet
)
export default router