import {TestingRepository} from "../repository/testing/testing-repository";
import {injectable} from "inversify";

@injectable()
export class TestingService  {

    constructor(protected testingRepository:TestingRepository) {}

    async deleteAllData() {
        return await this.testingRepository.deleteAllData()
    }
}