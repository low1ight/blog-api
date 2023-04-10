import {UserDBType} from "../../types/models/user/user-DB-type";


export const userToAuthMeModel = (user:UserDBType) => {

    return {
        userId:user._id.toString(),
        login:user.userData.login,
        email:user.userData.email,

    }


}