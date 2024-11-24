import express, { Request, Response } from "express";
import { createUser, readAllUser } from "../controller/post-controller";
import bcrypt from "bcrypt";

const routes = express.Router();

routes.get("/", (req:Request, res:Response)=>{
    res.status(200).send('halo');
});

routes.get("/users", readAllUser)
routes.post("/register", createUser)

export { routes }