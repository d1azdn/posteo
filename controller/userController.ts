import { PrismaClient } from '@prisma/client'
const jwt = require('jsonwebtoken')
const prisma = new PrismaClient()

import { Request, Response } from "express";
import bcrypt from "bcrypt";

async function checkUser(username:string) {
    const user = await prisma.user.findFirst({
        where:{
            username : username
        }, select:{
            id:true,
            username:true
        }
    })
    if (!user){
        return false
    }
    return user
}

async function readOneUser(req:Request,res:Response){
    try {
        const { username } = req.params
        const user = await checkUser(username)
        if (!user){
            res.status(200).json({
                status : "failed",
                message : "Username not found."})
            return
        }

        res.status(200).json({
            status : "success",
            message : "Username has been found.",
            data : user 
        })

      } catch (error) {
        res.status(500).json({
            status : "error",
            message : "Internal server error."})
      }
}

async function readAllUser(req:Request,res:Response){
    try {
        const users = await prisma.user.findMany();
        res.status(200).json({
            status : "success",
            message : "All username has been found.",
            data : users 
        })

      } catch (error) {
        res.status(500).json({
            status : "error",
            message : "Internal server error."})
      }
}

async function createUser(req:Request, res:Response){
    try{
        const { username, password } = req.body;

        if(!username || !password){
            res.status(400).send("Username or password required.")
        }

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        const registeredUser = await checkUser(username)
        if (registeredUser){
            res.status(200).json({
                status : "failed",
                message : "Username already registered."})
            return
        }

        await prisma.user.create({
            data:{
                username:username,
                password:hashed,
            }
        })
        res.status(200).json({
            status : "success",
            message : "Username successfully created.", 
        })
        
    }catch(err){
        res.status(500).json({
            status : "error",
            message : "Internal server error."})
    }

    
}

async function loginUser(req:Request, res:Response){
    try{
        const { username, password } = req.body

        const userFind = await prisma.user.findFirst({
            where:{
                username : username
            }
        })
        if (!userFind){
            res.status(200).json({
                status : "failed",
                message : "Username or password is incorrect."})
            return
        }

        const passCheck = await bcrypt.compare(password, userFind.password)
        if(!passCheck){
            res.status(200).json({
                status : "failed",
                message : "Username or password is incorrect."})
            return
        }

        //password variables conflict, so needed to specify the type using _, typescript :)
        const { password:_, ...userData } = userFind
        const token = jwt.sign(userData, process.env.SECRET_KEY, { expiresIn:"1h" })

        res.status(200).json({
            status : "success",
            message : "Have fun login!",
            data : "Bearer "+token
        })
    } catch (error) {
        res.status(500).json({
            status : "error",
            message : "Internal server error."})
    }
}

export { readOneUser, readAllUser, createUser, loginUser };