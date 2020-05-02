import { Page } from "../DTOs/Page";
import { User } from "../DTOs/User";
import { Reimbursement } from "../DTOs/Reimbursement";
import { UsersSearchFields } from "./UsersSearchFields";
import { ReimbursementsSearch } from "./ReimbursementsSearch";

export interface CurrentInfo {
    currentUsersPage:Page<User>;
    currentUserSearchFilters:UsersSearchFields;
    currentReimbursementsPage:Page<Reimbursement>;
    currentReimbursementSearchFilters:ReimbursementsSearch;
}