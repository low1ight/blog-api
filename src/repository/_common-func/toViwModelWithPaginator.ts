import {ViewModelWithPaginator} from "../../types/models/ViewModelWithPaginator";


const calculatePageCount = (pageCount:number,pageSize:number) => Math.round(pageCount / pageSize);




export const toViwModelWithPaginator = (toViewModel:Function,items:any,pageNumber:number,pageSize:number,elementCount:number):ViewModelWithPaginator<[]> => {


    return {
        pagesCount: calculatePageCount(elementCount, pageSize),
        page: pageNumber,
        pageSize: items.length,
        totalCount: elementCount,
        items: toViewModel(items)


    }


}
