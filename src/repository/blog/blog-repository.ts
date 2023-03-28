import {BlogInputModel} from "../../types/models/blog/blog-input-model";
import {Blog} from "../../db/models/blog";


export const blogRepository = {



    async createBlog({name,description,websiteUrl}:BlogInputModel) {

        const newBlog:BlogInputModel = {
            name,
            description,
            websiteUrl
        }


        return Blog.create(newBlog)


    },

    async updateBlog(blogId:string, {name,description,websiteUrl}:BlogInputModel) {

        const result = await Blog.findByIdAndUpdate(blogId,{name,description,websiteUrl})

        return result !== null


    },

    async deleteBlog(blogId:string) {

        const result = await Blog.deleteOne({_id:blogId})

        return result.deletedCount === 1


    }



}