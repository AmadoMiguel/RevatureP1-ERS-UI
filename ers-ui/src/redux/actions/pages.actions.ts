import { User } from "../../models/DTOs/User";
import { Page } from "../../models/DTOs/Page";
import { Dispatch } from "react";
import { DispatchPayload } from "../../models/redux_models/DispatchPayload";
import { Reimbursement } from "../../models/DTOs/Reimbursement";
import { UsersSearchFields } from "../../models/redux_models/UsersSearchFields";


export const pagesActionTypes = {
    UPDATE_USERS_PAGE : "UPDATE_USERS_PAGE",
    UPDATE_USERS_FILTER: "UPDATE_USERS_FILTER",
    UPDATE_REIMBURSEMENTS_PAGE: "UPDATE_REIMBURSEMENTS_PAGE",
    CLEAR_INFO:"CLEAR_INFO"
}

export const updateUsersPage = (usersPage:Page<User>) => (dispatch:Dispatch<DispatchPayload<Page<User>>>) => {
    dispatch(
        {
            type:pagesActionTypes.UPDATE_USERS_PAGE,
            payload:usersPage
        }
    )
}

export const updateUsersFilter = (usersFilter:UsersSearchFields) => (dispatch:Dispatch<DispatchPayload<UsersSearchFields>>) => {
    dispatch({
        type:pagesActionTypes.UPDATE_USERS_FILTER,
        payload:usersFilter
    })
}

export const updateReimbursementsPage = (reimbursementsPage:Page<Reimbursement>) => (dispatch:Dispatch<DispatchPayload<Page<Reimbursement>>>) => {
    dispatch(
        {
            type:pagesActionTypes.UPDATE_REIMBURSEMENTS_PAGE,
            payload:reimbursementsPage
        }
    )
}

export const clearInfo = () => (dispatch:Dispatch<any>) => {
    dispatch(
        {
            type:pagesActionTypes.CLEAR_INFO
        }
    )
}