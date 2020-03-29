import { Role } from "./Role";

export interface User {
    id:number;
    username:string;
    password:string;
    firstName:string;
    lastName:string;
    email:string;
    role:Role;
}