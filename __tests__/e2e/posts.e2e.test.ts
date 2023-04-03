import {runDb} from "../../src/db/db";
import request from "supertest";
import {app} from "../../src/app";





describe('base posts tests', () => {

    let blogId: string
    let blogName: string
    let postId: string

    beforeAll(async () => {

        await runDb()


        await request(app).delete('/api/testing/all-data').expect(204)


        const result = await request(app)
            .post('/api/blogs')
            .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
            .send({
                name: "ForPosts",
                description: "blogForPostTesting",
                websiteUrl: "https://www.li11111psum.com/"
            })

        expect(result.status).toEqual(201)


        blogId = result.body.id
        blogName = result.body.name


    })


    it('should return a 200 status code and an empty arr', async () => {
        const result = await request(app).get('/api/posts')

        expect(result.status).toEqual(200)

        expect(result.body).toEqual([])
    })


    it('should return a 400 if post created for now-existed blog', async () => {
        const result = await request(app).post('/api/posts')
            .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
            .send({
            title: "New post",
            shortDescription: "new post desciption",
            content: "new post content",
            blogId: "64072288a950830f9f23d79a"
        })

        expect(result.status).toEqual(400)

    })

    it('shold successful create a post with 201 status', async () => {
        console.log(blogId)

        const result = await request(app).post('/api/posts')
            .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
            .send({
            title: "New post",
            shortDescription: "new post desciption",
            content: "new post content",
            blogId: blogId
        })

        console.log(result.body.id)

        expect(result.status).toEqual(201)


        postId = result.body.id



        expect(result.body).toEqual(expect.objectContaining({
            id: expect.any(String),
            title: "New post",
            shortDescription: "new post desciption",
            content: "new post content",
            blogId: blogId,
            blogName: blogName,
            createdAt:expect.any(String)

        }))
    })

    it('should return a 404 status', async () => {
        const result = await request(app).put('/api/posts/' + 1)
            .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
            .send({
            title: "Updated post",
            shortDescription: "Updated desciption",
            content: "Updated content",
            blogId: blogId
        })

        expect(result.status).toEqual(404)


    })




    it('should successful update with 204 status', async () => {
        const result = await request(app).put('/api/posts/' + postId)
            .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
            .send({
            title: "Updated post",
            shortDescription: "Updated desciption",
            content: "Updated content",
            blogId: blogId
        })



        expect(result.status).toEqual(204)


    })

    it('should return a 404', async () => {
        const result = await request(app).get('/api/posts/' + 1)

        expect(result.status).toEqual(404)


    })

    it('should return a 200 status code and correct post', async () => {
        const result = await request(app).get('/api/posts/' + postId)

        expect(result.status).toEqual(200)

        expect(result.body).toEqual(expect.objectContaining({
            id: expect.any(String),
            title: "Updated post",
            shortDescription: "Updated desciption",
            content: "Updated content",
            blogId: blogId,
            blogName: blogName,
            createdAt:expect.any(String)
        }))
    })

    it('should return a 404', async () => {
        const result = await request(app).delete('/api/posts/' + 1)
            .set('Authorization', 'Basic YWRtaW46cXdlcnR5')


        expect(result.status).toEqual(404)


    })

    it('should return a 200 status code and correct post', async () => {
        const result = await request(app).delete('/api/posts/' + postId)
            .set('Authorization', 'Basic YWRtaW46cXdlcnR5')

        expect(result.status).toEqual(204)

    })


    it('should return a 200 status code and an empty arr', async () => {
        const result = await request(app).get('/api/posts')

        expect(result.status).toEqual(200)

        expect(result.body).toEqual([])
    })



})