import {ViewModelWithPaginator} from "../../types/models/ViewModelWithPaginator";
import {ActivityElem} from "../../types/models/user/user-DB-type";


const calculatePageCount = (pageCount:number,pageSize:number) => {

    let defaultCount = pageCount;

    if(pageCount < 1) defaultCount = 1

   return Math.ceil(defaultCount / pageSize)
}




export const toViwModelWithPaginator = (toViewModel:Function,items:any,pageNumber:number,pageSize:number,elementCount:number,userActivity:null | ActivityElem = null):ViewModelWithPaginator<[]> => {


    return {
        pagesCount: calculatePageCount(elementCount, pageSize),
        page: pageNumber,
        pageSize: pageSize,
        totalCount: elementCount,
        items: toViewModel(items,userActivity)


    }


}
