import {model} from "mongoose";
import {BlogDBType} from "../../types/models/blog/blog-DB-type";
import {blogSchema} from "../schemas/blog-schema";


export const Blog = model<BlogDBType>('Blog', blogSchema);
