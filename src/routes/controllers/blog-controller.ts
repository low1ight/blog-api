import {Request, Response} from "express";
import {blogQueryRepository} from "../../repository/blog/blog-query-repository";
import {RequestWithBody, RequestWithParams} from "../../types/request-type";
import {BlogInputModel} from "../../types/models/blog/blog-input-model";
import {blogService} from "../../domain/blog-service";
import {IdModel} from "../../types/models/common/id-model";





export const getBlogs = async (req:Request,res:Response) => {

    const blogs = await blogQueryRepository.getBlogs()

    return res.json(blogs)

}

export const getBlogById = async (req:RequestWithParams<IdModel>,res:Response) => {

    const blogs = await blogQueryRepository.getBlogById(req.params.id)

    return res.json(blogs)

}


export const postBlog = async (req:RequestWithBody<BlogInputModel>,res:Response) => {

    const blogs = await blogService.createBlog(req.body)

    return res.json(blogs)

}