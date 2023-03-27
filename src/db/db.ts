import mongoose from "mongoose";


let mongoUrl = 'mongodb+srv://qlowlight:uNrmiq0xtAknlUjI@cluster0.xahjpqu.mongodb.net/?retryWrites=true&w=majority'

export async function runDb() {

        await mongoose.connect(mongoUrl);


    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

runDb().catch(err => console.log(err));