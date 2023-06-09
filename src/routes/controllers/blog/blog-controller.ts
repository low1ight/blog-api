import {Response} from "express";
import {BlogQueryRepository} from "../../../repository/blog/blog-query-repository";
import {
    RequestWithBody,
    RequestWithParams,
    RequestWithParamsAndBody,
    RequestWithQuery
} from "../../../types/request-type";
import {BlogInputModel} from "../../../types/models/blog/blog-input-model";
import {BlogService} from "../../../domain/blog-service";
import {IdModel} from "../../../types/models/common/id-model";
import {BlogViewModel} from "../../../types/models/blog/blog-view-model";
import {BlogQueryType} from "../../../types/queryType/blog/blog-query-type";
import {blogQueryMapper} from "../../query-mappers/blog-query-mapper";
import {BlogInputQueryType} from "../../../types/queryType/blog/blog-input-query-type";
import {ViewModelWithPaginator} from "../../../types/models/ViewModelWithPaginator";
import {injectable} from "inversify";






@injectable()
export class BlogController  {

  constructor(protected blogService:BlogService,
              protected blogQueryRepository:BlogQueryRepository) {}

    async getBlogs(req: RequestWithQuery<BlogInputQueryType>, res: Response) {

        const query:BlogQueryType = blogQueryMapper(req.query)

        const blogs:ViewModelWithPaginator<BlogViewModel[]> = await this.blogQueryRepository.getBlogs(query)

        return res.json(blogs)

    }


    async getBlogById(req: RequestWithParams<IdModel>, res: Response) {

        const blogs:BlogViewModel | null = await this.blogQueryRepository.getBlogById(req.params.id)

        if(!blogs) return res.sendStatus(404)

        return res.json(blogs)

    }

    async postBlog(req: RequestWithBody<BlogInputModel>, res: Response) {

        const blogs:BlogViewModel = await this.blogService.createBlog(req.body)

        return res.status(201).json(blogs)

    }


    async putBlog(req: RequestWithParamsAndBody<IdModel, BlogInputModel>, res: Response) {

        const blogs = await this.blogService.updateBlog(req.params.id, req.body)

        if (!blogs) return res.sendStatus(404)

        return res.sendStatus(204)

    }


    async deleteBlog(req: RequestWithParams<IdModel>, res: Response) {

        const blogs: boolean = await this.blogService.deleteBlog(req.params.id)

        if (!blogs) return res.sendStatus(404)

        return res.sendStatus(204)

    }


}
