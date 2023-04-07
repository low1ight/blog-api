import {CommentDBType} from "../../types/models/comment/comment-DB-type";
import {CommentViewModel} from "../../types/models/comment/comment-view-model";


export const commentsArrToViewModel = (arr:CommentDBType[]):CommentViewModel[] => {

    return arr.map(item => commentsObjToViewModel(item))

}


export const commentsObjToViewModel = (item:CommentDBType):CommentViewModel => {
    return {
        id: item._id.toString(),
        content: item.content,
        commentatorInfo: {
            userId:item.commentatorInfo.userId.toString(),
            userLogin:item.commentatorInfo.userLogin
        },
        createdAt:item.createdAt

    }
}