import {describe} from "node:test";
import {runDb} from "../../src/db/db";
import request from "supertest";
import {app} from "../../src/app";

describe('base posts tests', () => {



    beforeAll(async () => {


        await runDb()

        await request(app).delete('/api/testing/all-data').expect(204)


    })


    it('should return a 200 status code and an empty arr',  async () => {
        const result = await request(app).get('/api/posts')

        expect(result.status).toEqual(200)

        expect(result.body).toEqual([])
    })









})