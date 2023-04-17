import {userRepository} from "../../../composition-root";


export const isLoginExist = async (login:string) => {

   const isLoginExist = await userRepository.isLoginExist(login)

    if(isLoginExist) throw new Error()

    return true

}