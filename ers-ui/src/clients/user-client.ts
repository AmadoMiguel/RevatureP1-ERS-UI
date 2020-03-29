import { ersClient } from ".";
import { UserCredentials } from "../models/DTOs/UserCredentials";
import { User } from "../models/DTOs/User";
import { UserPasswords } from "../models/DTOs/UserPasswords";

const usersUrl = "/ers/users";

export const userClient = {
    requestAllUsers(pageNum:number, sortOrders:string[], firstNameLike:string, lastNameLike:string, 
        emailMatcher:string, usernameMatcher:string) {
            return ersClient.get(`${usersUrl}/info`, {
                params:{
                    page:pageNum,
                    sortOrders:sortOrders,
                    firstName:firstNameLike,
                    lastName:lastNameLike,
                    email:emailMatcher,
                    username:usernameMatcher
                }
            });
    },
    requestUserInformation(userId:number) {
        return ersClient.get(`${usersUrl}/info/${userId}`);
    },
    loginUser(userCredentials:UserCredentials) {
        return ersClient.post(`${usersUrl}/login`, userCredentials);
    },
    registerNewUser(newUser:User) {
        return ersClient.post(`${usersUrl}/register`, newUser);
    },
    updateUserInfo(updateUser:User) {
        return ersClient.put(`${usersUrl}/update`, updateUser);
    },
    changePassword(userPasswords:UserPasswords) {
        return ersClient.patch(`${usersUrl}/update/password`, userPasswords);
    },
    removeUser(userId:number) {
        return ersClient.delete(`${usersUrl}/${userId}`);
    }
}
