export interface ReimbursementsSearch {
    searchBy:string;
    statusId:number;
    authorId:number;
    page:number;
    startDate:string;
    endDate:string;
    sortOptions:[]
}