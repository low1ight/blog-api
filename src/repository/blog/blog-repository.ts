import {BlogInputModel} from "../../types/models/blog/blog-input-model";
import {Blogs} from "../../db/models/blogs";


export const blogRepository = {



    async createBlog({name,description,websiteUrl}:BlogInputModel) {

        const newBlog:BlogInputModel = {
            name,
            description,
            websiteUrl
        }


        return Blogs.create(newBlog)


    },

    async updateBlog(blogId:string, {name,description,websiteUrl}:BlogInputModel) {

        const result = await Blogs.findByIdAndUpdate(blogId,{name,description,websiteUrl})

        return result !== null


    },

    async deleteBlog(blogId:string) {

        const result = await Blogs.deleteOne({_id:blogId})

        return result.deletedCount === 1


    }



}