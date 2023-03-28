import {BlogInputModel} from "../types/models/blog/blog-input-model";
import {blogRepository} from "../repository/blog/blog-repository";


export const blogService = {

    async createBlog(newBlogData:BlogInputModel) {

        return await blogRepository.createBlog(newBlogData)

    }
}