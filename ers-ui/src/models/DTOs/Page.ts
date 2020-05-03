import { Pageable } from "./Pageable";
import { Sort } from "./Sort";
import { User } from "./User";

export interface Page<T> {
    content:T[];
    pageable: Pageable,
    totalPages: number,
    totalElements: number,
    last: boolean,
    size: number,
    number: number,
    sort: Sort,
    numberOfElements: number,
    first: boolean,
    empty: boolean,
    reFetch: boolean
}

export const pageModel =  {
    content:[],
    pageable: {
        sort:{
            sorted:false,
            unsorted:true,
            empty:true
        },
        offset:0,
        pageNumber:0,
        pageSize:0,
        unpaged:false,
        paged:true
    },
    totalPages: 0,
    totalElements: 0,
    last: true,
    size: 0,
    number: 0,
    sort: {
        sorted:false,
        unsorted:true,
        empty:true
    },
    numberOfElements: 0,
    first: true,
    empty: true,
    reFetch: false
}

