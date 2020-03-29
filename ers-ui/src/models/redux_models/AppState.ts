import { UserState } from "./UserState";
import { CurrentInfo } from "./CurrentInfo";

export interface AppState {
    user:UserState,
    currentInfo:CurrentInfo
}