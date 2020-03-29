import { Pageable } from "./Pageable";
import { Sort } from "./Sort";

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
    empty: boolean
}
