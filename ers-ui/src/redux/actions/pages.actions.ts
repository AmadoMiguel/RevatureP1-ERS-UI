import { User } from "../../models/DTOs/User";
import { Page } from "../../models/DTOs/Page";
import { Dispatch } from "react";
import { DispatchPayload } from "../../models/redux_models/DispatchPayload";
import { Reimbursement } from "../../models/DTOs/Reimbursement";


export const pagesActionTypes = {
    UPDATE_USERS_PAGE : "UPDATE_USERS_PAGE",
    UPDATE_REIMBURSEMENTS_PAGE: "UPDATE_REIMBURSEMENTS_PAGE"
}

export const updateUsersPage = (usersPage:Page<User>) => (dispatch:Dispatch<DispatchPayload<Page<User>>>) => {
    dispatch(
        {
            actionType:pagesActionTypes.UPDATE_USERS_PAGE,
            actionPayload:usersPage
        }
    )
}

export const updateReimbursementsPage = (reimbursementsPage:Page<Reimbursement>) => (dispatch:Dispatch<DispatchPayload<Page<Reimbursement>>>) => {
    dispatch(
        {
            actionType:pagesActionTypes.UPDATE_REIMBURSEMENTS_PAGE,
            actionPayload:reimbursementsPage
        }
    )
}