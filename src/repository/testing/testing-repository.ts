import {Blog} from "../../db/models/blog";
import {Post} from "../../db/models/post";


export const testingRepository = {

    async deleteAllData():Promise<void> {

        await Blog.deleteMany()
        await Post.deleteMany()


    }



}