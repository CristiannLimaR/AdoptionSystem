import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dbConection } from "./mongo.js";
import limiter from "../src/middlewares/validar-cant-peticiones.js";
import authRoutes from '../src/auth/auth.routes.js'

export const configureMiddlewares = (app) => {
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());
  app.use(express.json());
  app.use(helmet());
  app.use(morgan("dev"));
  app.use(limiter);
};

const confugreRutes = (app) => {
  const authPath = '/adoptionSystem/v1/auth';
  app.use(authPath, authRoutes);
};

const connectDB = async () => {
  try {
    await dbConection();
    console.log("successful connection");
  } catch (error) {
    console.log("Error connecting to the database", error);
  }
};

export const startServer = async () => {
  const app = express();
  const port = process.env.PORT || 3000;
  await connectDB();
  configureMiddlewares(app);
  confugreRutes(app);
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};
