
export type CommentViewModel = {
    id: string,
    content:string
    commentatorInfo:CommentatorViewModel
    createdAt:Date
    likesInfo:LikesInfo
}



type LikesInfo = {
    likesCount:number
    dislikesCount:number
    myStatus:String
}


export type CommentatorViewModel = {
    userId:string,
    userLogin:string
}