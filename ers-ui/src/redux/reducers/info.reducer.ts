import { CurrentInfo } from "../../models/redux_models/CurrentInfo";
import { DispatchPayload } from "../../models/redux_models/DispatchPayload";
import { User } from "../../models/DTOs/User";
import { Page } from "../../models/DTOs/Page";
import { Reimbursement } from "../../models/DTOs/Reimbursement";
import { pagesActionTypes } from "../actions/pages.actions";

const initialState:CurrentInfo = {
    currentUsersPage : {
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
        empty: true
    },
    currentReimbursementsPage: {
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
        empty: true
    }
}

export function currentInfoReducer (state:CurrentInfo = initialState, action:any) : CurrentInfo {
        switch(action.actionType) {
            case pagesActionTypes.UPDATE_USERS_PAGE:
                return {
                    ...state, currentUsersPage:action.actionPayload
                }
            case pagesActionTypes.UPDATE_REIMBURSEMENTS_PAGE:
                return {
                    ...state, currentReimbursementsPage:action.actionPayload
                }
            default:
                return state;
        }
}
