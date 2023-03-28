import {BlogInputModel} from "../types/models/blog/blog-input-model";
import {blogRepository} from "../repository/blog/blog-repository";
import {blogQueryRepository} from "../repository/blog/blog-query-repository";


export const blogService = {


    async createBlog(newBlogData:BlogInputModel) {

        return await blogRepository.createBlog(newBlogData)

    },


    async updateBlog(id:string,newBlogData:BlogInputModel):Promise<boolean> {

        const isBlogExist:boolean = await blogQueryRepository.isBlogExist(id)

        if(!isBlogExist) return false

        return await blogRepository.updateBlog(id,newBlogData)

    },

    async deleteBlog(id:string):Promise<boolean> {

        const isBlogExist:boolean = await blogQueryRepository.isBlogExist(id)

        if(!isBlogExist) return false

        return await blogRepository.deleteBlog(id)

    }


}