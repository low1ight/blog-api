import {Blog} from "../../db/models/blog";
import {BlogDBType} from "../../types/models/blog/blog-DB-type";
import {blogObjToViewModel} from "../_mappers/toBlogViewModel";
import {BlogViewModel} from "../../types/models/blog/blog-view-model";
import {BlogQueryType} from "../../types/queryType/blog/blog-query-type";
import {getBlogsWithQuery} from "../_common-func/blog/getBlogsWithQuery";
import {ViewModelWithPaginator} from "../../types/models/ViewModelWithPaginator";


export class BlogQueryRepository  {


    async getBlogs(query:BlogQueryType): Promise<ViewModelWithPaginator<BlogViewModel[]>> {

        return await getBlogsWithQuery(query)

    }


    async getBlogById(id: string): Promise<BlogViewModel | null> {

        const result: null | BlogDBType = await Blog.findById(id).lean()

        if (!result) return null

        return blogObjToViewModel(result)

    }

    async isBlogExist(id: string): Promise<boolean> {

        const result = await Blog.exists({_id: id})

        return result !== null
    }
}


