import express, { Request, Response } from "express";
import { createUser, loginUser, readAllUser, readOneUser } from "../controller/userController";
import { createPost, deletePost, dislikePost, likePost, readAllPost, readOnePost } from "../controller/postController";
import { adminCheck, loginCheck } from "../middleware/userMiddleware";
import bcrypt from "bcrypt";

const routes = express.Router();

routes.get("/", (req:Request, res:Response)=>{
    res.status(200).send('halo');
});

routes.get("api/v1/userall", loginCheck, adminCheck, readAllUser)
routes.get("api/v1/user/:username", readOneUser)
routes.post("api/v1/register", createUser)
routes.post("api/v1/login", loginUser)

routes.get("api/v1/postall", loginCheck, adminCheck, readAllPost)
routes.get("api/v1/post/:id", loginCheck, readOnePost)
routes.post("api/v1/post/add", loginCheck, createPost)
routes.get("api/v1/post/delete/:id", loginCheck, deletePost)

routes.get("api/v1/post/like/:id", loginCheck, likePost)
routes.get("api/v1/post/dislike/:id", loginCheck, dislikePost)


export { routes }