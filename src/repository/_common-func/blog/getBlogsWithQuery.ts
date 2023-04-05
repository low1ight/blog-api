import {BlogQueryType} from "../../../types/queryType/blog/blog-query-type";
import {Blog} from "../../../db/models/blog";
import {blogsArrToViewModel} from "../../_mappers/toBlogViewModel";
import {createFindByOneFieldObj} from "../createFindByOneFieldObj";
import {toViwModelWithPaginator} from "../toViwModelWithPaginator";
import {calcSkipCount} from "../calcSkipCount";
import {createSortObject} from "../createSortObject";


export const getBlogsWithQuery = async ({searchNameTerm,sortBy,sortDirection,pageNumber,pageSize}:BlogQueryType) => {

    const findParams = createFindByOneFieldObj("name",searchNameTerm)

    const sortObj = createSortObject(sortBy,sortDirection)

    const skipCount = calcSkipCount(pageNumber,pageSize)



    const query = Blog.find(findParams);


    query.skip(skipCount)

    query.limit(pageSize)

    query.sort(sortObj)

    query.setOptions({ lean : true });



    const result = await query.exec();

    const totalElemCount = await Blog.countDocuments(findParams).exec();


    return toViwModelWithPaginator(blogsArrToViewModel,result,pageNumber,pageSize,totalElemCount)

}







