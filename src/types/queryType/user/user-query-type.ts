export type UserQueryType = {
    searchLoginTerm:string | null
    searchEmailTerm:string | null
    sortBy: string
    sortDirection: string
    pageNumber: number
    pageSize: number
}