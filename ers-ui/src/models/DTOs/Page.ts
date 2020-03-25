
export interface Page<T> {
    content:T[];
    totalPages:number;
    pageSize:number;
    first:boolean;
    last:boolean;
    pageNumber:number;
    empty:boolean;
}