import request from 'supertest'
import { app } from '../../src/app'
import {runDb} from "../../src/db/db";


describe('base blog tests', () => {

    //before all
    //



    beforeAll(async () => {
        await runDb()

        await request(app).delete('/api/testing/all-data').expect(204)


    })



    //global variables for describe

    let createdBlogId:string
    const INVALID_ID:number = 1




    it('should return a 200 status code',  async () => {
       const result = await request(app).get('/api/blogs')

        expect(result.status).toEqual(200)

        expect(result.body).toEqual([])
    })

    it('should return a 400 status with invalid URL',  async () => {
        const result = await request(app)
            .post('/api/blogs')
            .send({
                name:"new",
                description:"masddsa",
                websiteUrl:"string"
            })

        expect(result.status).toEqual(400)
    })

    it('should return a 200 status code',  async () => {
        const result = await request(app)
            .post('/api/blogs')
            .send({
                name:"UserName",
                description:"UserDescription",
                websiteUrl:"https://www.li11111psum.com/"
            })

        expect(result.status).toEqual(201)

        createdBlogId = result.body.id

        expect(result.body).toEqual(expect.objectContaining({
            id:expect.any(String),
            name:"UserName",
            description:"UserDescription",
            websiteUrl:"https://www.li11111psum.com/"
        }))
    })


    it('should response 404 for not existed blog',  async () => {
        const result = await request(app).put('/api/blogs' + INVALID_ID)
            .send({
                name:"UpdatedName",
                description:"UpdatedUserDescription",
                websiteUrl:"https://www.lpsum.com/"
            })

        expect(result.status).toEqual(404)

    })


    it('should successful update blog',  async () => {
        const result = await request(app).put('/api/blogs/' + createdBlogId)
            .send({
                name:"UpdatedName",
                description:"UpdatedUserDescription",
                websiteUrl:"https://www.lpsum.com/"
            })

        expect(result.status).toEqual(204)

    })


    it('should return a 404 status code for not-existed blog',  async () => {
        const result = await request(app).get('/api/blogs/' + INVALID_ID)

        expect(result.status).toEqual(404)


    })

    it('should return a 200 status code and found blog',  async () => {
        const result = await request(app).get('/api/blogs/' + createdBlogId)

        expect(result.status).toEqual(200)

        expect(result.body).toEqual(expect.objectContaining({
            id:expect.any(String),
            name:"UpdatedName",
            description:"UpdatedUserDescription",
            websiteUrl:"https://www.lpsum.com/"
        }))
    })


    it('should return a 404 status for not-existed blog',  async () => {
        const result = await request(app).delete('/api/blogs/' + INVALID_ID)

        expect(result.status).toEqual(404)

    })

    it('should return a 404 status for not-existed blog',  async () => {
        const result = await request(app).delete('/api/blogs/' + createdBlogId)

        expect(result.status).toEqual(204)

    })


    it('should return an empty arr',  async () => {
        const result = await request(app).get('/api/blogs')

        expect(result.status).toEqual(200)

        expect(result.body).toEqual([])
    })


})