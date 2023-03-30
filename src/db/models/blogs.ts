import {model} from "mongoose";
import {BlogDBType} from "../../types/models/blog/blog-DB-type";
import {blogsSchema} from "../schemas/blogs-schema";


export const Blogs = model<BlogDBType>('Blogs', blogsSchema);
