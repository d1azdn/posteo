import { PrismaClient } from '@prisma/client'
import { NextFunction, Request, Response } from "express";
const jwt = require('jsonwebtoken')
const prisma = new PrismaClient()

//This function used, because req.user can not be assigned instantly on Typescript
export type RequestType = {
    [prop: string]: any
} & Request

async function loginCheck(req:RequestType, res:Response, next:NextFunction){
    try{
        const header = req.headers['authorization']
        const token = header && header.split(' ')[1];

        if (!token){
            res.status(401).json({
                status : "failed",
                message : "Unauthorized token."
            })
            return
        }

        const payload = jwt.verify(token, process.env.SECRET_KEY);
        req.user = payload;
        next()
    } catch(error){
        res.status(403).json({
            status : "error",
            message : "Invalid or Expired token."
        })
    }
}

async function adminCheck(req:RequestType, res:Response, next:NextFunction){
    try{
        const { roleId } = req.user;
        const roleCheck = await prisma.role.findFirst({
            where:{
                id:roleId
            }, select:{
                role:true
            }
        })

        if (roleCheck?.role == "admin"){
            next()
            return
        }

        res.status(403).json({
            status:"failed",
            message:"You do not have permission."
        })

    }catch(error){
        res.status(500).json({
            status : "error",
            message : "Internal server error."})
    }
}

export { loginCheck, adminCheck };