import { Router } from "express";
import { check } from "express-validator";
import { getUsers, updateUser, getUserById, deleteUser, updatePassword } from "./user.controller.js";
import { validateFields } from "../middlewares/validate-fields.js";
import { existsUserById } from "../helpers/db-validator.js";
import { uploadProfilePicture } from "../middlewares/multer-upload.js";
import { hasRole } from "../middlewares/validate-roles.js";
import { validateJWT } from "../middlewares/validate-jwt.js";

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

router.put(
  "/updatePassword/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existsUserById),
    check('oldPassword', 'the old Password is required').notEmpty(),
    check('newPassword', 'Password must be at least 8 characters').isLength({min: 8}),
    validateFields,
  ],
  updatePassword
)

router.delete(
  "/:id",
  [
    validateJWT,
    hasRole("ADMIN_ROLE","VENTAS_ROLE"),
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existsUserById),
    validateFields
  ],
  deleteUser
)
export default router;