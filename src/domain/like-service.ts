import {LikeRepository} from "../repository/like/like-repository";
import {Types} from "mongoose";
import {LikeDBModel} from "../types/models/like/Like-DB-model";
import {createCustomResponse} from "../utils/errors/custromErrorObj/createCustomResponse";
import {UserRepository} from "../repository/user/user-repository";
import {injectable} from "inversify";

@injectable()
export class LikeService {

    constructor(protected likeRepository:LikeRepository,
                protected userRepository:UserRepository) {}


    async addLike(likeTarget:string,targetId:string,likeStatus:"Like" | "Dislike",userId:string,userLogin:string) {

        const likeObj = {
            likeTarget,
            targetId:new Types.ObjectId(targetId),
            likeStatus,
            userLogin,
            userId:new Types.ObjectId(userId)
        }

        return await this.likeRepository.addLike(likeObj)

    }


    async getUserLikeForTarget(userId:string,targetId:string,target:string):Promise<LikeDBModel | null> {

        return await this.likeRepository.getLikeUserLikeForTarget(userId,targetId,target)



    }


    async setLikeStatus(likeStatus:"Like" | "Dislike" | "None", targetId:string, userId:string,likeTarget:string){
        const like:LikeDBModel | null = await this.getUserLikeForTarget(userId,targetId,likeTarget)


        if(likeStatus === "None") {

            if (!like) return createCustomResponse(true, 204, 'like already has None status')

            const isUserLikeDeleted = await this.deleteLikeById(like._id)

            if (isUserLikeDeleted) return createCustomResponse(true, 204, 'successful')


        } else {

            if(like) {
                //if current like status the same with new like status, return
                if(like.likeStatus === likeStatus) return createCustomResponse(true, 204, 'successful')

                const result = await this.updateLikeStatus(like._id,likeStatus)

                if(result) return createCustomResponse(true, 204, 'successful')

            } else {

                const user = await this.userRepository.getUserById(userId)

                if(!user) return createCustomResponse(true, 404, 'user dont exist')

                const creatingLikeResult = await this.addLike(likeTarget,targetId,likeStatus,userId,user.userData.login)

                if(creatingLikeResult)  return createCustomResponse(true, 204, 'successful')

            }


        }

        return createCustomResponse(false, 400, 'db err')
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