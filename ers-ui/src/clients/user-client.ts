import { ersClient } from ".";
import { UserCredentials } from "../models/DTOs/UserCredentials";
import { User } from "../models/DTOs/User";
import { UserPasswords } from "../models/DTOs/UserPasswords";
import { Role } from "../models/DTOs/Role";
import { roles } from "../constants/roles";
import { UsersSearchFields } from "../models/redux_models/UsersSearchFields";

const usersUrl = "/ers/users";

export const userClient = {
    requestAllUsers(searchCriteria:UsersSearchFields, jwt:string) {
            return ersClient.get(`${usersUrl}/info`, {
                headers:{
                    Authorization:jwt
                },
                params:{
                    page:searchCriteria.page,
                    sortOrders:searchCriteria.sortOrders.toString(),
                    firstName:searchCriteria.firstNameLike,
                    lastName:searchCriteria.lastNameLike,
                    email:searchCriteria.emailMatcher,
                    username:searchCriteria.usernameMatcher,
                    role:searchCriteria.roleId
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
    updateUserInfo(updateUser:User, jwt:string) {
        return ersClient.put(`${usersUrl}/update`, updateUser,
        {
            headers:{
                Authorization:jwt
            }
        });
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
