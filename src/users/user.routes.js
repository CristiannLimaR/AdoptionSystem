import { Router } from "express";
import { check } from "express-validator";
import { getUsers, updateUser, getUserById } from "./user.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { existsUserById } from "../helpers/db-validator.js";
import { uploadProfilePicture } from "../middlewares/multer-upload.js";
const router = Router();

router.get("/", getUsers);

router.get(
  "/findUser/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existsUserById),
    validarCampos,
  ],
  getUserById
);

router.put(
  "/:id",
  uploadProfilePicture.single("profilePicture"),
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existsUserById),
    validarCampos,
  ],
  updateUser
);
export default router;
