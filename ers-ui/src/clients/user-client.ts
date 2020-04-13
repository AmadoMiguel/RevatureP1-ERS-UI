import { ersClient } from ".";
import { UserCredentials } from "../models/DTOs/UserCredentials";
import { User } from "../models/DTOs/User";
import { UserPasswords } from "../models/DTOs/UserPasswords";

const usersUrl = "/ers/users";

export const userClient = {
    requestAllUsers(pageNum:number, sortOrders:string[], firstNameLike:string, lastNameLike:string, 
        emailMatcher:string, usernameMatcher:string, jwt:string) {
            return ersClient.get(`${usersUrl}/info`, {
                headers:{
                    Authorization:jwt
                },
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
        return ersClient.get(`${usersUrl}/id/${userId}`);
    },
    findUserByUsername(username:string, jwt:string) {
        return ersClient.get(`${usersUrl}/username/${username}`,
        {
            headers:{
                Authorization:jwt
            }
        });
    },
    loginUser(username:string) {
        return ersClient.post(`${usersUrl}/login/username/${username}`);
    },
    loginPassword(pass:string, jwt:string) {
        return ersClient.post(`${usersUrl}/login/password/${pass}`,null,{
            headers:{
                Authorization:jwt
            }
        });
    },
    registerNewUser(newUser:any) {
        return ersClient.post(`${usersUrl}/register`, newUser);
    },
    updateUserInfo(updateUser:User) {
        return ersClient.put(`${usersUrl}/update`, updateUser);
    },
    changePassword(userPasswords:UserPasswords, jwt:string) {
        return ersClient.patch(`${usersUrl}/update/password`, userPasswords,
        {
            headers:{
                Authorization:jwt
            }
        });
    },
    removeUser(userId:number) {
        return ersClient.delete(`${usersUrl}/${userId}`);
    }
}
