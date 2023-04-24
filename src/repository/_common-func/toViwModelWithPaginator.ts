import {ViewModelWithPaginator} from "../../types/models/ViewModelWithPaginator";
import {LikeDBModel} from "../../types/models/like/Like-DB-model";


const calculatePageCount = (pageCount:number,pageSize:number) => {

    let defaultCount = pageCount;

    if(pageCount < 1) defaultCount = 1

   return Math.ceil(defaultCount / pageSize)
}




export const toViwModelWithPaginator = (toViewModel:Function,items:any,pageNumber:number,pageSize:number,elementCount:number,userActivity:null | LikeDBModel[] = null):ViewModelWithPaginator<[]> => {


    return {
        pagesCount: calculatePageCount(elementCount, pageSize),
        page: pageNumber,
        pageSize: pageSize,
        totalCount: elementCount,
        items: toViewModel(items,userActivity)


    }


}
