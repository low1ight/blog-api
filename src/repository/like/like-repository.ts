import {LikeModel} from "../../types/models/like/Like-model";
import {Like} from "../../db/models/like";
import {Types} from "mongoose";
import {injectable} from "inversify";

@injectable()
export class LikeRepository {

    async addLike(likeObj:LikeModel) {
        return Like.create(likeObj)
    }

    async getLikeUserLikeForTarget(userId:string, targetId:string, likeTarget:string) {
        return Like.findOne({userId,targetId,likeTarget})
    }
    async deleteLikeById(likeId:Types.ObjectId | string) {
        return Like.deleteOne({_id:likeId})
    }

    async updateLikeStatus(likeId:Types.ObjectId | string,newLikeStatus:string) {
        return Like.updateOne({_id:likeId},{likeStatus:newLikeStatus})


    }


    async getUserLikes(userId:string,likeTarget:string) {

        return Like.find({userId,likeTarget})

    }


}