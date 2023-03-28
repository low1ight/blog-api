import {Blog} from "../../db/models/blog";


export const blogQueryRepository = {


    async getBlogs() {

        return Blog.find({})

    },


    async getBlogById(id:string) {

       return Blog.findById(id)

    }
}


