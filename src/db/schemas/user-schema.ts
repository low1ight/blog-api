import {Schema} from "mongoose";

import {
    UserConfirmation,
    UserData,
    UserDBType,
    UserCommentLike,
    ActivityElem
} from "../../types/models/user/user-DB-type";



export const userDataSchema = new Schema<UserData>({
    login: {type: String, required: true},
    password: {type: String, required: true},
    passwordRecoveryCode: {type: String, default: null},
    email: {type: String, required: true},
}, {timestamps: true, _id: false},)


export const userConfirmation = new Schema<UserConfirmation>({
    confirmationCode: {type: String, required: true},
    isConfirmed: {type: Boolean, required: true},
    expirationDate: {type: Date, required: true},
}, {_id: false})


export const userLikeAndDislikeSchema = new Schema<UserCommentLike>({
    commentId: {type: Schema.Types.ObjectId, required: true},
}, {_id: false ,timestamps: { createdAt: 'createdAt' }})


export const userActivityElemSchema = new Schema<ActivityElem>({
    likes: {type: [userLikeAndDislikeSchema], default: []},
    dislikes: {type: [userLikeAndDislikeSchema], default: []}
}, {_id: false})

export const userSchema = new Schema<UserDBType>({
    userData: {type: userDataSchema, required: true},
    userConfirmation: {type: userConfirmation, required: true},
    userActivity: {
        commentActivity: {
            type: userActivityElemSchema,
            default: {
                likes: [],
                dislikes: []
            }
        }
    }
},)
