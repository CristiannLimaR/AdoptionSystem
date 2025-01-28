import { config } from "dotenv";
import { startServer } from "./configs/server.js";
config();

startServer();