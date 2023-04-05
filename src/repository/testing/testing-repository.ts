import {Blog} from "../../db/models/blog";
import {Post} from "../../db/models/post";
import {User} from "../../db/models/user";


export const testingRepository = {

    async deleteAllData():Promise<void> {

        await Blog.deleteMany()
        await Post.deleteMany()
        await User.deleteMany()


    }



}