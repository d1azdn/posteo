import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { routes } from "./routes/post-routes"
import bcrypt from "bcrypt";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(routes)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});