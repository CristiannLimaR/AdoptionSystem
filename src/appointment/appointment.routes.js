import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { getAppointments, saveAppointment } from "./appointment.controller.js";
import { appointmentValidator } from "../middlewares/validator.js";

const router = Router();

router.post(
  "/",
  appointmentValidator,
  [
    
    validateJWT,
    check("email", "Este no es un correo valido").not().isEmpty(),
    validateFields
  ],
  saveAppointment
);

router.get("/", getAppointments);

export default router;
