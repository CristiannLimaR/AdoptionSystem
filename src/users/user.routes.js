import { Router } from "express";
import { check } from "express-validator";
import { getUsers, updateUser, getUserById, deleteUser } from "./user.controller.js";
import { validateFields } from "../middlewares/validate-fields.js";
import { existsUserById } from "../helpers/db-validator.js";
import { uploadProfilePicture } from "../middlewares/multer-upload.js";
const router = Router();

router.get("/", getUsers);

router.get(
  "/findUser/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existsUserById),
    validateFields,
  ],
  getUserById
);

router.put(
  "/:id",
  uploadProfilePicture.single("profilePicture"),
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existsUserById),
    validateFields,
  ],
  updateUser
);

router.delete(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existsUserById),
    validateFields
  ],
  deleteUser
)
export default router;
