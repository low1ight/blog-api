import {BlogDBType} from "../../types/models/blog/blog-DB-type";
import {BlogViewModel} from "../../types/models/blog/blog-view-model";


export const blogsArrToViewModel = (arr:BlogDBType[]):BlogViewModel[] => {

          return arr.map(item => blogObjToViewModel(item))

}

export const blogObjToViewModel = (item:BlogDBType):BlogViewModel => {
    return ({
        id: item._id.toString(),
        name: item.name,
        description: item.description,
        websiteUrl: item.websiteUrl
    })
}