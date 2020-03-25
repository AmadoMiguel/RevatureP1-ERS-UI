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
        actionType:userActionTypes.UPDATE_USER_LOGGED_IN,
        actionPayload:val
    });
};

export const updateSessionUser = 
(auth:UserAuthentication) => (dispatch:Dispatch<DispatchPayload<UserAuthentication>>) => {
    dispatch({
        actionType:userActionTypes.UPDATE_SESSION_INFO,
        actionPayload:auth
    });
};

export const updateUserInfo = (user:User) => (dispatch:Dispatch<any>) => {
    dispatch({
        type:userActionTypes.UPDATE_USER_INFO,
        userInfo:user
    });
};
