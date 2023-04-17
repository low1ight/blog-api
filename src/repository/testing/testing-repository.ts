import {Blog} from "../../db/models/blog";
import {Post} from "../../db/models/post";
import {User} from "../../db/models/user";
import {Device} from "../../db/models/device";


export class TestingRepository  {

    async deleteAllData():Promise<void> {

        await Blog.deleteMany()
        await Post.deleteMany()
        await User.deleteMany()
        await Device.deleteMany()


    }



}