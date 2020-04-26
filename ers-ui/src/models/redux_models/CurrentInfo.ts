import { Page } from "../DTOs/Page";
import { User } from "../DTOs/User";
import { Reimbursement } from "../DTOs/Reimbursement";
import { UsersSearchFields } from "./UsersSearchFields";

export interface CurrentInfo {
    currentUsersPage:Page<User>;
    currentUserSearchFilters:UsersSearchFields;
    currentReimbursementsPage:Page<Reimbursement>;
}