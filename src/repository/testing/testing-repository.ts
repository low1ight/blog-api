import {Blog} from "../../db/models/blog";
import {Post} from "../../db/models/post";
import {User} from "../../db/models/user";
import {Device} from "../../db/models/device";
import {Comment} from "../../db/models/comment";

export class TestingRepository  {

    async deleteAllData():Promise<void> {

        await Blog.deleteMany()
        await Post.deleteMany()
        await User.deleteMany()
        await Device.deleteMany()
        await Comment.deleteMany()


    }



}