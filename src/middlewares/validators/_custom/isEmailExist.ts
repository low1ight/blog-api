import {userRepository} from "../../../composition-root";

export const isEmailExist = async (email:string) => {

   const isEmailExist = await userRepository.isEmailExist(email)

    if(isEmailExist) throw new Error()

    return true

}