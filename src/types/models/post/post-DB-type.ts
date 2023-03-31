import {ObjectId} from "mongoose";


export type PostDBType = {
    _id: ObjectId,
    title: string
    shortDescription: string
    content: string
    blogId: ObjectId
    blogName: string

}