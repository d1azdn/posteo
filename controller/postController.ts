import { PrismaClient } from '@prisma/client'
import { Request, Response } from "express";
const prisma = new PrismaClient()

//This function used, because req.user can not be assigned instantly on Typescript
export type RequestType = {
    [prop: string]: any
} & Request

async function checkPost(postcode:number){
    const post = await prisma.post.findFirst({
        where:{
            id : postcode
        }
    })
    if (!post){
        return false
    }
    return post
}

async function checkLikePost(postcode:number, user:string){
    const checkLiked = await prisma.postLiked.findFirst({
        where : {
            postId : postcode,
            userId : user
        }
    })
    if (!checkLiked){
        return false
    }
    return true
}

async function checkDislikePost(postcode:number, user:string){
    const checkDisliked = await prisma.postDisliked.findFirst({
        where : {
            postId : postcode,
            userId : user
        }
    })
    if (!checkDisliked){
        return false
    }
    return true
}

async function readAllPost(req:Request, res:Response){
    try{
        const post = await prisma.post.findMany()
        res.status(200).json({
            status : "success",
            message : "All Post has been found.",
            data : post 
        })
    } catch (error){
        res.status(500).json({
            status : "error",
            message : "Internal server error."
        })
    }
}

async function readOnePost(req:Request, res:Response){
    try{
        const postId = parseInt(req.params.id)
        const post = await checkPost(postId)
        
        if (!post){
            res.status(200).json({
                status : "failed",
                message : "Post not found."
            })
            return
        }
        
        res.status(200).json({
            status : "success",
            message : "Post has been found.",
            data : post
        })

    } catch (error){
        res.status(500).json({
            status : "error",
            message : "Internal server error."
        })
    }
}

async function createPost(req:RequestType, res:Response){
    try{
        const { title, content } = req.body
        if (!title || !content){
            res.status(400).json({
                status : "failed",
                message : "Title and content are required."
            })
            return
        }

        await prisma.post.create({
            data:{
                userId : req.user.id,
                title:title,
                content:content
            }
        })

        res.status(200).json({
            status : "success",
            message : "Post successfully created.", 
        })
    } catch (error){
        res.status(500).json({
            status : "error",
            message : "Internal server error.", 
        })
    }
}

async function deletePost(req:RequestType, res:Response){
    try{
        const postId = parseInt(req.params.id)
        const post = await prisma.post.findFirst({
            where: {
                id : postId,
                userId: req.user.id
            }
        })
        if (!post){
            res.status(200).json({
                status : "failed",
                message : "Post not found."
            })
            return
        }

        await prisma.post.delete({
            where:{
                id:postId
            }
        })

        res.status(200).json({
            status : "success",
            message : "Post has been deleted.",
        })
    } catch (error){
        res.status(500).json({
            status : "error",
            message : "Internal server error.", 
        })
    }
}

async function likePost(req:RequestType, res:Response){
    try{
        const postId = parseInt(req.params.id)
        const post = await checkPost(postId)
        if (!post){
            res.status(200).json({
                status : "failed",
                message : "Post not found."
            })
            return
        }


        // This will be the guide how to toggled post like and dislike, check the like
        const checkLike = await checkLikePost(postId, req.user.id)

        // If the post not already liked.
        if (!checkLike){
            // Checking if the post are in dislike
            const checkDisliked = await checkDislikePost(postId, req.user.id)

            if (checkDisliked){
                // Delete data from post disliked, and post dislike -1
                const checkDisliked = await prisma.postDisliked.deleteMany({
                    where : {
                        postId : postId,
                        userId : req.user.id
                    }
                })
                await prisma.post.update({
                    where : {
                        id : postId
                    }, data:{
                        dislikes : {
                            decrement : 1
                        }
                    }
                })
            }

            // If the post is NOT in dislike
            // Create data from post liked, and post like +1
            await prisma.postLiked.create({
                data:{
                    postId : postId,
                    userId : req.user.id
                }
            })

            await prisma.post.update({
                where : {
                    id : postId
                }, data:{
                    likes : {
                        increment : 1
                    }
                }
            })

            res.status(200).json({
                status : "success",
                message : "Liked this post.", 
            })
            return
        }

        // If the post already liked.
        res.status(200).json({
            status : "failed",
            message : "You already liked this.", 
        })
    
    } catch (error){
        res.status(500).json({
            status : "error",
            message : "Internal server error.", 
        })
    }
}

async function dislikePost(req:RequestType, res:Response){
    try{
        const postId = parseInt(req.params.id)
        const post = await checkPost(postId)
        if (!post){
            res.status(200).json({
                status : "failed",
                message : "Post not found."
            })
            return
        }


        // This will be the guide how to toggled post like and dislike, check the dislike
        const checkDislike = await checkDislikePost(postId, req.user.id)

        // If the post not already disliked.
        if (!checkDislike){
            // Checking if the post are in like
            const checkLiked = await checkLikePost(postId, req.user.id)

            if (checkLiked){
                // Delete data from post like, and post like -1
                const checkDisliked = await prisma.postLiked.deleteMany({
                    where : {
                        postId : postId,
                        userId : req.user.id
                    }
                })
                await prisma.post.update({
                    where : {
                        id : postId
                    }, data:{
                        likes : {
                            decrement : 1
                        }
                    }
                })
            }

            // If the post is NOT in dislike
            // Create data from post dislike, and post dislike +1
            await prisma.postDisliked.create({
                data:{
                    postId : postId,
                    userId : req.user.id
                }
            })

            await prisma.post.update({
                where : {
                    id : postId
                }, data:{
                    dislikes : {
                        increment : 1
                    }
                }
            })

            res.status(200).json({
                status : "success",
                message : "Disliked this post.", 
            })
            return
        }

        // If the post already disliked.
        res.status(200).json({
            status : "failed",
            message : "You already disliked this.", 
        })
    
    } catch (error){
        res.status(500).json({
            status : "error",
            message : "Internal server error.", 
        })
    }
}

export { readAllPost, readOnePost, createPost, deletePost, likePost, dislikePost } 