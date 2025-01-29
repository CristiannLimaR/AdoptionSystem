import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dbConection } from "./mongo.js";
import limiter from "../src/middlewares/validar-cant-peticiones.js";
import authRoutes from '../src/auth/auth.routes.js'

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
  const port = process.env.PORT || 3000;

  try {
    middlewares(app);
    connectDB();
    routes(app);
    app.listen(port)
    confugreRutes(app);
    console.log(`Server running on port ${port}`);

  } catch (err) {
    console.log(`Server init failed: ${err}`)
  }

};
