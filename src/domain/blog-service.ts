import {BlogInputModel} from "../types/models/blog/blog-input-model";
import {BlogRepository} from "../repository/blog/blog-repository";
import {BlogQueryRepository} from "../repository/blog/blog-query-repository";


export class BlogService  {


    constructor(protected blogRepository:BlogRepository,
                protected blogQueryRepository:BlogQueryRepository) {}


    async createBlog(newBlogData:BlogInputModel) {

        return await this.blogRepository.createBlog(newBlogData)

    }


    async updateBlog(id:string,newBlogData:BlogInputModel):Promise<boolean> {

        const isBlogExist:boolean = await this.blogQueryRepository.isBlogExist(id)

        if(!isBlogExist) return false

        return await this.blogRepository.updateBlog(id,newBlogData)

    }

    async deleteBlog(id:string):Promise<boolean> {

        const isBlogExist:boolean = await this.blogQueryRepository.isBlogExist(id)

        if(!isBlogExist) return false

        return await this.blogRepository.deleteBlog(id)

    }


}