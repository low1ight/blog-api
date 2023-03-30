import {Request, Response} from "express";
import {blogQueryRepository} from "../../repository/blog/blog-query-repository";
import {RequestWithBody, RequestWithParams, RequestWithParamsAndBody} from "../../types/request-type";
import {BlogInputModel} from "../../types/models/blog/blog-input-model";
import {blogService} from "../../domain/blog-service";
import {IdModel} from "../../types/models/common/id-model";







export const blogController = {

    async getBlogs(req: Request, res: Response) {

        const blogs = await blogQueryRepository.getBlogs()

        return res.json(blogs)

    },


    async getBlogById(req: RequestWithParams<IdModel>, res: Response) {

        const blogs = await blogQueryRepository.getBlogById(req.params.id)

        return res.json(blogs)

    },

    async postBlog(req: RequestWithBody<BlogInputModel>, res: Response) {

        const blogs = await blogService.createBlog(req.body)

        return res.json(blogs)

    },


    async putBlog(req: RequestWithParamsAndBody<IdModel, BlogInputModel>, res: Response) {

        const blogs = await blogService.updateBlog(req.params.id, req.body)

        if (!blogs) return res.sendStatus(404)

        return res.sendStatus(204)

    },


    async deleteBlog(req: RequestWithParams<IdModel>, res: Response) {

        const blogs: boolean = await blogService.deleteBlog(req.params.id)

        if (!blogs) return res.sendStatus(404)

        return res.sendStatus(204)

    }


}
