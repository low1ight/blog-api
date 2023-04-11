

export const createCustomResponse = (successful:boolean,statusCode:number,content:any):CustomResponse<any> => {
    return {
        successful,
        statusCode,
        content
    }
}


export type CustomResponse<T> = {
    successful:boolean
    statusCode:number
    content:T
}