import { CurrentInfo } from "../../models/redux_models/CurrentInfo";
import { DispatchPayload } from "../../models/redux_models/DispatchPayload";
import { User } from "../../models/DTOs/User";
import { Page } from "../../models/DTOs/Page";
import { Reimbursement } from "../../models/DTOs/Reimbursement";
import { pagesActionTypes } from "../actions/pages.actions";

const initialState:CurrentInfo = {
    currentUsersPage : {
        content:[],
        totalPages:0,
        pageSize:0,
        first:false,
        last:false,
        pageNumber:0,
        empty:true
    },
    currentReimbursementsPage: {
        content:[],
        totalPages:0,
        pageSize:0,
        first:false,
        last:false,
        pageNumber:0,
        empty:true
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
