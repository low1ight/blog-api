import {BlogInputModel} from "../../types/models/blog/blog-input-model";
import {Blog} from "../../db/models/blog";
import {blogObjToViewModel} from "../_mappers/toBlogViewModel";
import {BlogViewModel} from "../../types/models/blog/blog-view-model";


export class BlogRepository  {


    async createBlog({name,description,websiteUrl}:BlogInputModel):Promise<BlogViewModel> {

        const newBlog = {
            name,
            description,
            websiteUrl,
        }


        const result = await Blog.create(newBlog)

        return blogObjToViewModel(result)


    }

    async updateBlog(blogId:string, {name,description,websiteUrl}:BlogInputModel):Promise<boolean> {

        const result = await Blog.updateOne({_id: blogId},{name,description,websiteUrl})

        return result.matchedCount > 0


    }

    async deleteBlog(blogId:string):Promise<boolean> {

        const result = await Blog.deleteOne({_id:blogId})

        return result.deletedCount === 1


    }


}