import { UserState } from "../../models/redux_models/UserState";
import { DispatchPayload } from "../../models/redux_models/DispatchPayload";
import { UserAuthentication } from "../../models/redux_models/UserAuthentication";
import { User } from "../../models/DTOs/User";
import { userActionTypes } from "../actions/users.actions";

const initialState: UserState = {
    isLoggedIn:false,
    sessionInfo:{
        username:"",
        role:"",
        jwt:""
    },
    userInfo:{
        id:0,
        username:"",
        password:"",
        firstName:"",
        lastName:"",
        email:"",
        role:{
            id:0,
            name:""
        }
    }
}

export function userReducer (state:UserState = initialState, action:any) : UserState {
    switch(action.type) {
        case userActionTypes.UPDATE_USER_LOGGED_IN:
            return {
                ...state, isLoggedIn:action.payload
            }
        case userActionTypes.UPDATE_SESSION_INFO:
            return {
                ...state, sessionInfo:action.payload
            }
        case userActionTypes.UPDATE_USER_INFO:
            return {
                ...state, userInfo:action.payload
            }
        case userActionTypes.LOGOUT_USER:
            return initialState
        default:
            return state
    }
}
