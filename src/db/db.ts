import mongoose from "mongoose";


let mongoUrl = 'mongodb+srv://qlowlight:uNrmiq0xtAknlUjI@cluster0.xahjpqu.mongodb.net/?retryWrites=true&w=majority'

export async function runDb() {

        await mongoose.connect(mongoUrl);

}

runDb().catch(err => console.log(err));