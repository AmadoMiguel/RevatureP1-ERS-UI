import { CurrentInfo } from "../../models/redux_models/CurrentInfo";
import { DispatchPayload } from "../../models/redux_models/DispatchPayload";
import { User } from "../../models/DTOs/User";
import { Page, pageModel } from "../../models/DTOs/Page";
import { Reimbursement } from "../../models/DTOs/Reimbursement";
import { pagesActionTypes } from "../actions/pages.actions";

const initialState:CurrentInfo = {
    currentUsersPage : pageModel,
    currentUserSearchFilters:{
        page:0,
        firstNameLike:'',
        lastNameLike:'',
        emailMatcher:'',
        usernameMatcher:'',
        roleId:0,
        sortOrders:[]
    },
    currentReimbursementsPage: pageModel,
    currentReimbursementSearchFilters:{
        page:0,
        statusId:1,
        authorId:0,
        startDate:'',
        endDate:'',
        sortOptions:[],
        searchBy:"status"
    }
}

export function currentInfoReducer (state:CurrentInfo = initialState, action:any) : CurrentInfo {
        switch(action.type) {
            case pagesActionTypes.UPDATE_USERS_PAGE:
                return {
                    ...state, currentUsersPage:action.payload
                }
            case pagesActionTypes.UPDATE_USERS_FILTER:
                return {
                    ...state, currentUserSearchFilters:action.payload
                }
            case pagesActionTypes.UPDATE_REIMBURSEMENTS_PAGE:
                return {
                    ...state, currentReimbursementsPage:action.payload
                }
            case pagesActionTypes.UPDATE_REIMBURSEMENTS_FILTER:
                return {
                    ...state, currentReimbursementSearchFilters:action.payload
                }
            case pagesActionTypes.CLEAR_INFO:
                return initialState;
            default:
                return state;
        }
}
