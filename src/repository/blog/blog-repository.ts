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


    }



}