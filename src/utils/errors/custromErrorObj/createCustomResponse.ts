

export const createCustomResponse = (successful:boolean,content:string):CustomResponse => {
    return {
        successful,
        content
    }
}


export type CustomResponse = {
    successful:boolean
    content:string | object
}