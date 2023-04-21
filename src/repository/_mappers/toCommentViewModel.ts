import {CommentDBType} from "../../types/models/comment/comment-DB-type";
import {CommentViewModel} from "../../types/models/comment/comment-view-model";
import {ActivityElem} from "../../types/models/user/user-DB-type";


export const commentsArrToViewModel = (arr:CommentDBType[],userActivity:null | ActivityElem):CommentViewModel[] => {

    return arr.map(item => commentsObjToViewModel(item,userActivity))

}


export const commentsObjToViewModel = (item:CommentDBType, userActivity:null | ActivityElem):CommentViewModel => {

    let userLike:boolean = false
    let userDislike:boolean = false

   if(userActivity) {
       userLike = userActivity.likes.some(obj => obj.commentId.toString() === item._id.toString());
       userDislike = userActivity.dislikes.some(obj => obj.commentId.toString() === item._id.toString());
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
            likesCount:item.likesCount,
            dislikesCount:item.dislikesCount,
            myStatus:userLike && "Like" || userDislike && "Dislike" || "None"

        }

    }
}