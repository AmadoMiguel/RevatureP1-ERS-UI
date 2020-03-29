import { Role } from "./Role";

export interface NewUser {
    id:number;
    username:string;
    firstName:string;
    lastName:string;
    email:string;
    role:Role;
}