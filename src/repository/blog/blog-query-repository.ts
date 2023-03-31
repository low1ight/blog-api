import {Blog} from "../../db/models/blog";
import {BlogDBType} from "../../types/models/blog/blog-DB-type";
import {blogObjToViewModel, blogsArrToViewModel} from "../_mappers/toBlogViewModel";
import {BlogViewModel} from "../../types/models/blog/blog-view-model";


export const blogQueryRepository = {


    async getBlogs(): Promise<BlogViewModel[]> {

        const result: BlogDBType[] = await Blog.find({}).lean()

        return blogsArrToViewModel(result)

    },


    async getBlogById(id: string): Promise<BlogViewModel | null> {

        const result: null | BlogDBType = await Blog.findById(id).lean()

        if (!result) return null

        return blogObjToViewModel(result)

    },

    async isBlogExist(id: string): Promise<boolean> {

        const result = await Blog.exists({_id: id})

        return result !== null
    }
}


