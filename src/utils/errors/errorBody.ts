import {ErrorObj} from "./errorObj";


export const errorBody = (err:ErrorObj[] | ErrorObj) => {
    if(Array.isArray(err)) {
        return { errorsMessages: [...err]}
    }
    return { errorsMessages: [err]}
}