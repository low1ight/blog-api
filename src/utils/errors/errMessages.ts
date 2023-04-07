





export const errMessages = {


    notExist: () => "Field must exist!",
    isEmpty: () => "Field can't be an empty",

    incorrectType: (typeName:string) => `Incorrect type of field, field must be a ${typeName}!`,
    tooLong: (maxLength:number) => `Field is too long! (maxLength: ${maxLength})`,
    tooShort: (minLength:number) => `Field is too short! (minLength: ${minLength})`,
    invalidFormat:(field:string) => `Invalid ${field} format`,
    invalidUrl: () => `Invalid URL!`,
    invalidEmail: () => `Invalid Email`,
    emailAlreadyTaken: () => `Email is already taken.`,
    loginAlreadyTaken: () => `Login is already taken.`,



}