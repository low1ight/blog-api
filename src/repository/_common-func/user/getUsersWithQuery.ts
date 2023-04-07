import {toViwModelWithPaginator} from "../toViwModelWithPaginator";
import {calcSkipCount} from "../calcSkipCount";
import {createSortObject} from "../createSortObject";
import {ViewModelWithPaginator} from "../../../types/models/ViewModelWithPaginator";
import {User} from "../../../db/models/user";
import {UserQueryType} from "../../../types/queryType/user/user-query-type";
import {UserViewModel} from "../../../types/models/user/user-view-model";
import {usersArrToViewModel} from "../../_mappers/toUserViewModel";
import {createFindBySeveralFieldObj} from "../createFindBySeveralFieldObj";


export const getUsersWithQuery = async ({searchLoginTerm,searchEmailTerm,sortBy,sortDirection,pageNumber,pageSize}:UserQueryType,additionalParams:object = {}):Promise<ViewModelWithPaginator<UserViewModel[]>> => {


    const sortObj = createSortObject(sortBy,sortDirection)

    const skipCount = calcSkipCount(pageNumber,pageSize)

    const findFields = createFindBySeveralFieldObj({login:searchLoginTerm,email:searchEmailTerm},"$or")


    const query = User.find(findFields,additionalParams);

    query.skip(skipCount)

    query.limit(pageSize)

    query.sort(sortObj)

    query.setOptions({ lean : true });



    const totalElemCount = await User.countDocuments(findFields,additionalParams).exec();

    const result = await query.exec();



    return toViwModelWithPaginator(usersArrToViewModel,result,pageNumber,pageSize,totalElemCount)

}







