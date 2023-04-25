import {PostDBType, PostPopulatedType} from "../../types/models/post/post-DB-type";
import {PostViewModel} from "../../types/models/post/post-view-model";
import {LikeDBModel} from "../../types/models/like/Like-DB-model";


export const postsArrToViewModel = (arr:PostPopulatedType[],userPostsLikes:LikeDBModel[] | null):PostViewModel[] => {

    return arr.map(item => postsObjToViewModel(item,userPostsLikes))

}


export const postsObjToViewModel = (item:PostPopulatedType,userPostsLikes:LikeDBModel[] | null):PostViewModel => {


    let likeItem
    let lastLikeArr:LikeDBModel[] = []
    let likesCount = 0
    let dislikesCount = 0
    if (item.likes.length > 0) {
        //if comment include any like/dislike calculate like/dislike count
        const like = item.likes.filter(i => i.likeStatus === "Like")
        likesCount = like.length
        dislikesCount = item.likes.length - likesCount
        lastLikeArr = like
            .sort((a,b) => (a.updatedAt < b.updatedAt) ? 1 : ((a.updatedAt > b.updatedAt) ? -1 : 0))
            .slice(0,3)
    }

    if(userPostsLikes) {
        //find current user like for this item
        likeItem = userPostsLikes.find(i => i.targetId.toString() === item._id.toString())


    }


    return {
        id: item._id.toString(),
        title: item.title,
        shortDescription: item.shortDescription,
        content: item.content,
        blogId: item.blogId.toString(),
        blogName: item.blogName,
        createdAt:item.createdAt,
        extendedLikesInfo:{
            likesCount,
            dislikesCount,
            myStatus:likeItem?.likeStatus || "None",
            newestLikes:mapToNewestLikeViewModel(lastLikeArr)
        }

    }
}

export const createdPostToViewModel = (item:PostDBType):PostViewModel => {


    return {
        id: item._id.toString(),
        title: item.title,
        shortDescription: item.shortDescription,
        content: item.content,
        blogId: item.blogId.toString(),
        blogName: item.blogName,
        createdAt:item.createdAt,
        extendedLikesInfo:{
            likesCount:0,
            dislikesCount:0,
            myStatus: "None",
            newestLikes:[]
        }

    }
}


function mapToNewestLikeViewModel(arr:LikeDBModel[]) {
    return arr.map(i => {
        return {
            addedAt:i.updatedAt.toString(),
            userId:i.userId.toString(),
            login:i.userLogin
        }
    })
}