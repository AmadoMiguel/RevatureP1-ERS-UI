import { Page } from "../DTOs/Page";
import { User } from "../DTOs/User";
import { Reimbursement } from "../DTOs/Reimbursement";

export interface CurrentInfo {
    currentUsersPage:Page<User>;
    currentReimbursementsPage:Page<Reimbursement>;
}