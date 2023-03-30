import {Blogs} from "../../db/models/blogs";


export const testingRepository = {

    async deleteAllData():Promise<void> {

        await Blogs.deleteMany()


    }



}