import {PostDBType} from "../../types/models/post/post-DB-type";
import {PostViewModel} from "../../types/models/post/post-view-model";


export const postsArrToViewModel = (arr:PostDBType[]):PostViewModel[] => {

    return arr.map(item => postsObjToViewModel(item))

}


export const postsObjToViewModel = (item:PostDBType):PostViewModel => {
    return {
        id: item._id.toString(),
        title: item.title,
        shortDescription: item.shortDescription,
        content: item.content,
        blogId: item.blogId.toString(),
        blogName: item.blogName

    }
}