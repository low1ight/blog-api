





export const errMessages = {


    notExist: () => "Field must exist!",
    isEmpty: () => "Field can't be an empty",

    incorrectType: (typeName:string) => `Incorrect type of field, field must be a ${typeName}!`,
    tooLong: (maxLength:number) => `Field is too long! (maxLength: ${maxLength})`,
    invalidUrl: () => `Invalid URL!`,



}