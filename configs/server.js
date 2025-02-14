import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dbConection } from "./mongo.js";
import limiter from "../src/middlewares/validate-cant-request.js";
import authRoutes from '../src/auth/auth.routes.js'
import userRoutes from '../src/users/user.routes.js'
import petRoutes from '../src/pet/pet.routes.js'
import appointmentRoutes from '../src/appointment/appointment.routes.js'

export const middlewares = (app) => {
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cors());
  app.use(helmet());
  app.use(morgan("dev"));
  app.use(limiter);
};

const routes = (app) => {
  app.use('/adoptionSystem/v1/auth', authRoutes);
  app.use("/adoptionSystem/v1/users", userRoutes);
  app.use("/adoptionSystem/v1/pets", petRoutes);
  app.use("/adoptionSystem/v1/appointments",appointmentRoutes)
};

const connectDB = async () => {
  try {
    await dbConection();
    console.log("successful connection");
  } catch (error) {
    console.log("Error connecting to the database", error);
  }
};

export const initServer = () => {
  const app = express();
  const port = process.env.PORT || 3001;

  try {
    middlewares(app);
    connectDB();
    routes(app);
    app.listen(port)
    console.log(`Server running on port ${port}`);

  } catch (err) {
    console.log(`Server init failed: ${err}`)
  }

};
