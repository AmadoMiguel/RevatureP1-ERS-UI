import { CurrentInfo } from "../../models/redux_models/CurrentInfo";
import { DispatchPayload } from "../../models/redux_models/DispatchPayload";
import { User } from "../../models/DTOs/User";
import { Page, pageModel } from "../../models/DTOs/Page";
import { Reimbursement } from "../../models/DTOs/Reimbursement";
import { pagesActionTypes } from "../actions/pages.actions";

const initialState:CurrentInfo = {
    currentUsersPage : pageModel,
    currentReimbursementsPage: pageModel
}

export function currentInfoReducer (state:CurrentInfo = initialState, action:any) : CurrentInfo {
        switch(action.type) {
            case pagesActionTypes.UPDATE_USERS_PAGE:
                return {
                    ...state, currentUsersPage:action.payload
                }
            case pagesActionTypes.UPDATE_REIMBURSEMENTS_PAGE:
                return {
                    ...state, currentReimbursementsPage:action.payload
                }
            default:
                return state;
        }
}
