import {userRepository} from "../../../repository/user/user-repository";

export const isEmailExist = async (email:string) => {

   const isEmailExist = await userRepository.isEmailExist(email)

    if(isEmailExist) throw new Error()

    return true

}