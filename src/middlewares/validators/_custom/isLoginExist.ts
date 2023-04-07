
import {userRepository} from "../../../repository/user/user-repository";

export const isLoginExist = async (login:string) => {

   const isLoginExist = await userRepository.isLoginExist(login)

    if(isLoginExist) throw new Error()

    return true

}