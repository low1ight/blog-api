import {RequestWithParams} from "../../../types/request-type";
import {IdModel} from "../../../types/models/common/id-model";
import {NextFunction,Response} from "express";
import {commentRepository} from "../../../composition-root";


export const isCommentOwner = async (req:RequestWithParams<IdModel>,res:Response,next:NextFunction) => {

    const comment = await commentRepository.getCommentById(req.params.id)

    if(!comment) return  res.sendStatus(404)


    const commentOwnerId = comment.commentatorInfo.userId.toString()

    if(commentOwnerId !== req.authUserData!.userId) return res.sendStatus(403)

    next()


}