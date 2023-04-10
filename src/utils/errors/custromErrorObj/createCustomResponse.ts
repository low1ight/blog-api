

export const createCustomResponse = (successful:boolean,content:any):CustomResponse<any> => {
    return {
        successful,
        content
    }
}


export type CustomResponse<T> = {
    successful:boolean
    content:T
}