import {NextFunction, Request, Response} from "express";
import {UserActivity} from "../types/models/user/user-DB-type";
import {userRepository} from "../composition-root";

export const getUserActivity = async (req:Request,res:Response,next:NextFunction) => {


    const currentUserId = req.authUserData?.userId || null

    let userActivity:UserActivity | null = null

    if(currentUserId) {
         userActivity = await userRepository.getUserActivityById(currentUserId)
        req.userActivity = userActivity
    }

    next()


}