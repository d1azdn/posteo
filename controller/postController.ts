import { PrismaClient } from '@prisma/client'
import { Request, Response } from "express";
const jwt = require('jsonwebtoken')
const prisma = new PrismaClient()

// async function readAllPost(req:Request, res:Response){
//     try{

//     } catch (error){

//     }
// }