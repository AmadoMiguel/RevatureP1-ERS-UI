import { ReimbursementsSearch } from "../models/redux_models/ReimbursementsSearch";
import { ersClient } from ".";
import { Reimbursement } from "../models/DTOs/Reimbursement";

const reimbursementsUrl = "/ers/reimbursements";
export const reimbursementsClient = {
    findReimbursementsByStatusId(searchCriteria:ReimbursementsSearch, jwt:string) {
        console.log(searchCriteria);
        return ersClient.get(`${reimbursementsUrl}/status/${searchCriteria.statusId}`,{
            headers:{
                Authorization:jwt
            },
            params:{
                page:searchCriteria.page,
                startDate:searchCriteria.startDate,
                endDate:searchCriteria.endDate,
                sortBy:searchCriteria.sortOptions.toString()
            }
        });
    },
    findReimbursementsByAuthorId(searchCriteria:ReimbursementsSearch, jwt:string) {
        return ersClient.get(`${reimbursementsUrl}/author/${searchCriteria.authorId}`,{
            headers:{
                Authorization:jwt
            },
            params:{
                page:searchCriteria.page,
                startDate:searchCriteria.startDate,
                endDate:searchCriteria.endDate,
                sortBy:searchCriteria.sortOptions.toString()
            }
        });
    },
    createReimbursement(reimb:any, jwt:string) {
        return ersClient.post(`${reimbursementsUrl}/create`,reimb,
        {
            headers:{
                Authorization:jwt
            }
        })
    },
    updateReimbursement(reimb:Reimbursement, jwt:string) {
        return ersClient.patch(`${reimbursementsUrl}/update`,reimb,
        {
            headers:{
                Authorization:jwt
            }
        });
    }
}