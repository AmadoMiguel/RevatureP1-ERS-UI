import { ReimbursementType } from "./ReimbursementType";
import { User } from "./User";
import { ReimbursementStatus } from "./ReimbursementStatus";

export interface Reimbursement {
    id:number;
    description:string;
    type:ReimbursementType;
    author:User;
    resolver:User;
    status:ReimbursementStatus;
    dateSubmitted:Date;
    dateResolved:Date;
}