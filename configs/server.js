import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dbConection } from "./mongo.js";

export const configureMiddlewares = (app) => {
    app.use(express.urlencoded({extended: false}));
    app.use(cors())
    app.use(express.json());
    app.use(helmet());
    app.use(morgan('dev'))
  };

const confugreRutes = () => {

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
