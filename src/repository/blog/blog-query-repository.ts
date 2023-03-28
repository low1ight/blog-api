import {Blog} from "../../db/models/blog";


export const blogQueryRepository = {


    async getBlogs() {

        return Blog.find({})

    },


    async getBlogById(id:string) {

       return Blog.findById(id)

    },

    async isBlogExist(id:string):Promise<boolean> {
        const result = await Blog.exists({_id:id})

        return result !== null
    }
}


