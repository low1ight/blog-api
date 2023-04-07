
export type CommentViewModel = {
    id: string,
    content:string
    commentatorInfo:CommentatorViewModel
    createdAt:Date
}



export type CommentatorViewModel = {
    userId:string,
    userLogin:string
}