import {Request, Response} from 'express'
import {postQueryRepository} from "../../repository/post/post-query-repository";


export const postController = {


    async getPosts(req: Request, res: Response) {

        const posts = await postQueryRepository.getPosts()

        return res.json(posts)


    }


}