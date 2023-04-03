import express from "express";
import {blogRouter} from "./routes/blog-router";
import {testingRouter} from "./routes/testing-router";
import {postRouter} from "./routes/post-router";




export const app = express()



//body parser
app.use(express.json())


app.get('/', (req, res) => {
    res.send('Hello World!')
})


const baseUrl = '/api/'

app.use(baseUrl + 'blogs', blogRouter)
app.use(baseUrl + 'posts', postRouter)
app.use(baseUrl + 'testing', testingRouter)