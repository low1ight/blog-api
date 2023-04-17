import {TestingRepository} from "../repository/testing/testing-repository";


export class TestingService  {

    constructor(protected testingRepository:TestingRepository) {}

    async deleteAllData() {
        return await this.testingRepository.deleteAllData()
    }
}