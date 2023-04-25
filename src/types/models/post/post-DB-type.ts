import {ObjectId} from "mongoose";
import {LikeDBModel} from "../like/Like-DB-model";


export type PostDBType = {
    _id: ObjectId,
    title: string
    shortDescription: string
    content: string
    blogId: ObjectId
    blogName: string
    createdAt:Date
    updatedAt:Date

}
export type PostPopulatedType = {
    _id: ObjectId,
    title: string
    shortDescription: string
    content: string
    blogId: ObjectId
    likes:LikeDBModel[]
    blogName: string
    createdAt:Date
    updatedAt:Date

}