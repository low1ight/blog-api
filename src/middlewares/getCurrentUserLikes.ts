import {NextFunction, Request, Response} from "express";
import {likeRepository} from "../composition-root";
import {LikeDBModel} from "../types/models/like/Like-DB-model";

const getCurrentUserLikes = async (req:Request, res:Response, next:NextFunction,likeTarget:string) => {


    const currentUserId = req.authUserData?.userId || null

    let userActivity:LikeDBModel[] | null = null

    if(currentUserId) {

        userActivity = await likeRepository.getUserLikes(currentUserId,likeTarget)

        req.userActivity = userActivity

    }

    next()


}
export const getCurrentUserCommentLikes = async (req:Request, res:Response, next:NextFunction) => {
    return getCurrentUserLikes(req,res,next,'comment')
}