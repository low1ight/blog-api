import express from "express";
import {blogRouter} from "./routes/blog-router";



export const app = express()



//body parser
app.use(express.json())



app.get('/', (req, res) => {
    res.send('Hello World!')
})


const baseUrl = '/api/'

app.use(baseUrl + 'blogs', blogRouter)