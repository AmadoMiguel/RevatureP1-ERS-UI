import { ReimbursementsSearch } from "../models/redux_models/ReimbursementsSearch";
import { ersClient } from ".";

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
    }
}