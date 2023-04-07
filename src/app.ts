import express from "express";
import {blogRouter} from "./routes/blog-router";
import {testingRouter} from "./routes/testing-router";
import {postRouter} from "./routes/post-router";
import {userRouter} from "./routes/user-router";
import {authRouter} from "./routes/auth-router";
import {commentRouter} from "./routes/comment-router";




export const app = express()



//body parser
app.use(express.json())


app.get('/', (req, res) => {
    res.send('Hello World!')
})


const baseUrl = '/api/'

app.use(baseUrl + 'blogs', blogRouter)
app.use(baseUrl + 'posts', postRouter)
app.use(baseUrl + 'users', userRouter)
app.use(baseUrl + 'comments', commentRouter)
app.use(baseUrl + 'auth', authRouter)
app.use(baseUrl + 'testing', testingRouter)
