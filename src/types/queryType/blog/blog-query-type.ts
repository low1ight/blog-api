export type BlogQueryType = {
    searchNameTerm: string | null
    sortBy: string
    sortDirection: string
    pageNumber: number
    pageSize: number
}