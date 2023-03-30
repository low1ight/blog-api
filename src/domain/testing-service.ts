import {testingRepository} from "../repository/testing/testing-repository";


export const testingService = {

    async deleteAllData() {
        return await testingRepository.deleteAllData()
    }
}