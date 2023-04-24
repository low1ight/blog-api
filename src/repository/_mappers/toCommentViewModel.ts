import {CommentDBType, CommentPopulatedType} from "../../types/models/comment/comment-DB-type";
import {CommentViewModel} from "../../types/models/comment/comment-view-model";
import {LikeDBModel} from "../../types/models/like/Like-DB-model";


export const commentsArrToViewModel = (arr:CommentPopulatedType[] ,userActivity:null | LikeDBModel[]):CommentViewModel[] => {

    return arr.map(item => commentsObjToViewModel(item,userActivity))

}


export const commentsObjToViewModel = (item:CommentPopulatedType , userActivity:null | LikeDBModel[]):CommentViewModel => {

    let likeItem
    let likeCount = 0
    let dislikeCount = 0
   if (item.likes.length > 0) {
       //if comment include any like/dislike calculate like/dislike count
        likeCount = item.likes.filter(i => i.likeStatus === "Like").length
        dislikeCount = item.likes.length - likeCount
   }

   if(userActivity) {
       //find current user like for this item
       likeItem = userActivity.find(i => i.targetId.toString() === item._id.toString())


   }

    return {
        id: item._id.toString(),
        content: item.content,
        commentatorInfo: {
            userId:item.commentatorInfo.userId.toString(),
            userLogin:item.commentatorInfo.userLogin
        },
        createdAt:item.createdAt,
        likesInfo:{
            likesCount:likeCount,
            dislikesCount:dislikeCount,
            myStatus:likeItem?.likeStatus || "None"
        }
    }
}
export const createdCommentToViewModel = (item:CommentDBType):CommentViewModel => {


    return {
        id: item._id.toString(),
        content: item.content,
        commentatorInfo: {
            userId:item.commentatorInfo.userId.toString(),
            userLogin:item.commentatorInfo.userLogin
        },
        createdAt:item.createdAt,
        likesInfo:{
            likesCount:0,
            dislikesCount:0,
            myStatus:"None"
        }
    }
}