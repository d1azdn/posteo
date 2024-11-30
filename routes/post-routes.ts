import express, { Request, Response } from "express";
import { createUser, loginUser, readAllUser, readOneUser } from "../controller/userController";
import { createPost, dislikePost, likePost, readAllPost, readOnePost } from "../controller/postController";
import { adminCheck, loginCheck } from "../middleware/userMiddleware";
import bcrypt from "bcrypt";

const routes = express.Router();

routes.get("/", (req:Request, res:Response)=>{
    res.status(200).send('halo');
});

routes.get("/userall", loginCheck, adminCheck, readAllUser)
routes.get("/user/:username", readOneUser)
routes.post("/register", createUser)
routes.post("/login", loginUser)

routes.get("/postall", loginCheck, adminCheck, readAllPost)
routes.get("/post/:id", loginCheck, readOnePost)
routes.post("/post/add", loginCheck, createPost)
routes.get("/post/like/:id", loginCheck, likePost)
routes.get("/post/dislike/:id", loginCheck, dislikePost)


export { routes }