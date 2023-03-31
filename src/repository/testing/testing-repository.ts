import {Blog} from "../../db/models/blog";


export const testingRepository = {

    async deleteAllData():Promise<void> {

        await Blog.deleteMany()


    }



}