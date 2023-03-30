import {Blogs} from "../../db/models/blogs";


export const blogQueryRepository = {


    async getBlogs() {

        return Blogs.find({})

    },


    async getBlogById(id:string) {

       return Blogs.findById(id)

    },

    async isBlogExist(id:string):Promise<boolean> {
        const result = await Blogs.exists({_id:id})

        return result !== null
    }
}


