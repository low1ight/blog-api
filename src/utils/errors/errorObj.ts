export const errorObj = (message:string, field:string):ErrorObj => {
    return {
        message,
        field
    }
}


export type ErrorObj = {
    message:string,
    field:string
}