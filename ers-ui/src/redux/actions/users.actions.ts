import { UserAuthentication } from "../../models/redux_models/UserAuthentication";
import { User } from "../../models/DTOs/User";
import { Dispatch } from "react";
import { DispatchPayload } from "../../models/redux_models/DispatchPayload";

export const userActionTypes = {
    UPDATE_USER_LOGGED_IN: "UPDATE_USER_LOGGED_IN",
    UPDATE_SESSION_INFO: "UPDATE_SESSION_INFO",
    UPDATE_USER_INFO: "UPDATE_USER_INFO"
};

export const updateUserLoggedIn = (val:boolean) => (dispatch:Dispatch<DispatchPayload<boolean>>) => {
    dispatch({
        type:userActionTypes.UPDATE_USER_LOGGED_IN,
        payload:val
    });
};

export const updateSessionUser = (auth:UserAuthentication) => (dispatch:Dispatch<DispatchPayload<UserAuthentication>>) => {
    dispatch({
        type:userActionTypes.UPDATE_SESSION_INFO,
        payload:auth
    });
};

export const updateUserInfo = (user:User) => (dispatch:Dispatch<DispatchPayload<User>>) => {
    dispatch({
        type:userActionTypes.UPDATE_USER_INFO,
        payload:user
    });
};
