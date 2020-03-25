import { User } from "../DTOs/User";
import { UserAuthentication } from "./UserAuthentication";

export interface UserState {
    isLoggedIn:boolean;
    sessionInfo:UserAuthentication;
    userInfo: User;
}