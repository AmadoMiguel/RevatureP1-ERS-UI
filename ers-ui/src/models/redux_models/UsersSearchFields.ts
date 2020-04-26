
export interface UsersSearchFields {
    page:number;
    firstNameLike:string;
    lastNameLike:string;
    emailMatcher:string;
    usernameMatcher:string;
    roleId:number;
    sortOrders:string[];
}
