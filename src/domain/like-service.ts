import {LikeRepository} from "../repository/like/like-repository";
import {Types} from "mongoose";
import {LikeDBModel} from "../types/models/like/Like-DB-model";


export class LikeService {

    constructor(protected likeRepository:LikeRepository) {}


    async addLike(likeTarget:string,targetId:string,likeStatus:"Like" | "Dislike",userId:string) {

        const likeObj = {
            likeTarget,
            targetId:new Types.ObjectId(targetId),
            likeStatus,
            userId:new Types.ObjectId(userId)
        }

        return await this.likeRepository.addLike(likeObj)

    }


    async getUserLikeForTarget(userId:string,targetId:string,target:string):Promise<LikeDBModel | null> {

        return await this.likeRepository.getLikeUserLikeForTarget(userId,targetId,target)



    }


    async deleteLikeById(likeId:Types.ObjectId) {

        const deleteResult = await this.likeRepository.deleteLikeById(likeId)

        return deleteResult.deletedCount === 1

    }


    async updateLikeStatus(likeId:Types.ObjectId | string,newLikeStatus:string) {
        const updatingResult = await this.likeRepository.updateLikeStatus(likeId,newLikeStatus)

        return updatingResult.matchedCount === 1
    }

}