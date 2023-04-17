import {ObjectId} from "mongodb";
import {blogQueryRepository} from "../../../composition-root";


export const isBlogExist = async (blogId:string) => {

    if(!ObjectId.isValid(blogId)) throw new Error("Invalid id format")

    const isBlogExist = await blogQueryRepository.isBlogExist(blogId)

    if(!isBlogExist) throw new Error("You can't create post for not-existed blog")

    return true

}