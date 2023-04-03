import {Schema} from "mongoose";
import {BlogDBType} from "../../types/models/blog/blog-DB-type";

export const blogSchema = new Schema<BlogDBType>({
    name: {type: String, required: true},
    description: {type: String, required: true},
    websiteUrl: {type: String, required: true},
}, { timestamps: true })