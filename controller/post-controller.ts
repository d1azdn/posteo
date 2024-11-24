import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { Request, Response } from "express";
import bcrypt from "bcrypt";

async function readAllUser(req:Request,res:Response){
    try {
        const users = await prisma.user.findMany();
        res.json(users);
      } catch (error) {
        res.status(500).json({ error: "Failed to retrieve users." });
      }
}

async function createUser(req:Request, res:Response){
    const { username, password } = req.body;

    if(!username || !password){
        res.status(400).send("Username or password required.")
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    await prisma.user.create({
        data:{
            username:username,
            password:hashed,
        }
    })
    res.send("done creating user.")
}

export { createUser, readAllUser };