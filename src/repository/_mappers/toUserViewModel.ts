import {UserDBType} from "../../types/models/user/user-DB-type";
import {UserViewModel} from "../../types/models/user/user-view-model";


export const usersArrToViewModel = (arr:UserDBType[]):UserViewModel[] => {

          return arr.map(item => userObjToViewModel(item))

}

export const userObjToViewModel = (item:UserDBType):UserViewModel => {
    return ({
        id: item._id.toString(),
        login: item.userData.login,
        email: item.userData.email,
        createdAt:item.userData.createdAt,

    })
}