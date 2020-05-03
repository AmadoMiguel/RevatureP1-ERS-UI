import React, { useEffect, useState } from 'react';
import GeneralTitleComponent from '../general_title';
import { CurrentInfo } from '../../models/redux_models/CurrentInfo';
import { Page } from '../../models/DTOs/Page';
import { Reimbursement } from '../../models/DTOs/Reimbursement';
import { AppState } from '../../models/redux_models/AppState';
import { updateReimbursementsPage, updateReimbursementsFilter } from '../../redux/actions/pages.actions';
import { connect } from 'react-redux';
import { UserState } from '../../models/redux_models/UserState';
import { ReimbursementsSearch } from '../../models/redux_models/ReimbursementsSearch';
import { Table, Spinner, Container, Col, Row, Button } from 'react-bootstrap';
import { reimbursementsClient } from '../../clients/reimbursement-client';
import { AxiosResponse } from 'axios';
import {toast} from 'react-toastify';
import { Dialog, DialogTitle, DialogActions, DialogContent } from '@material-ui/core';
import { reimbursementsStatus } from '../../constants/reimbursement_status';
import { tableStyles } from './styles';
import { pencilTool, pencilPath } from '../../assets/svg_icons';
import SearchReimbursementsComponent from './search_reimbursements';
import PaginationControls from '../users/pagination_controls';
import ConfirmDialog from './confirm_dialog';

interface IReimbursementsProps {
    user:UserState;
    currentInfo:CurrentInfo;
    updateReimbursementsPage: (reimbursementsPage:Page<Reimbursement>) =>void;
    updateReimbursementsFilter: (reimbFilter:ReimbursementsSearch) => void;
}

export function ReimbursementsComponent(props:IReimbursementsProps) {
    const defaultReimb:Reimbursement = {
        id:0, amount:0,description:"",type:{id:0,name:""},author:{
            id:0,firstName:"",lastName:"",username:"",password:"",email:"",role:{id:0,name:""}
        },resolver:{
            id:0,firstName:"",lastName:"",username:"",password:"",email:"",role:{id:0,name:""}
        },status:{id:0,name:""}, dateSubmitted:new Date(), dateResolved:new Date()
    };
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [updated, setUpdated] = useState<boolean>(false);
    const [searchBy, setSearchBy] = useState<any>("status");
    const [searchState, setSearchState] = useState<ReimbursementsSearch>(
        {...props.currentInfo.currentReimbursementSearchFilters}
    );
    const [openConfirm, setOpenConfirm] = useState<boolean>(false);
    const [selectedReimb, setSelectedReimb] = useState<Reimbursement>(defaultReimb);
    const [isApprove, setIsApprove] = useState<boolean>();
    // const styles = tableStyles();

    // load reimbursements
    useEffect(() => {
        if (!props.currentInfo.currentReimbursementsPage.content.length || updated ||
            props.currentInfo.currentReimbursementsPage.reFetch) {
            setIsLoading(true);
            if (props.currentInfo.currentReimbursementSearchFilters.searchBy=="status") {
                reimbursementsClient.findReimbursementsByStatusId(
                    props.currentInfo.currentReimbursementSearchFilters, props.user.sessionInfo.jwt)
                .then((resp:AxiosResponse<Page<Reimbursement>>) => {
                    props.updateReimbursementsPage({...resp.data,
                    reFetch:false});
                    props.updateReimbursementsFilter({
                        ...props.currentInfo.currentReimbursementSearchFilters,
                        page:0
                    });
                    setIsLoading(false);
                    setUpdated(false);
                })
                .catch((err)=>{
                    toast.error("An error ocurred");
                    setIsLoading(false);
                    setUpdated(false);
                })
            } else {
                reimbursementsClient.findReimbursementsByAuthorId(
                    props.currentInfo.currentReimbursementSearchFilters, props.user.sessionInfo.jwt)
                .then((resp:AxiosResponse<Page<Reimbursement>>) => {
                    props.updateReimbursementsPage(resp.data);
                    setIsLoading(false);
                    setUpdated(false);
                })
                .catch((err)=>{
                    toast.error("An error ocurred");
                    setIsLoading(false);
                    setUpdated(false);
                })
            }
        }
    }, [updated]);

    // Function to handle the change of any search field
    function onSearchChange(e:any) {
        setSearchState({
            ...searchState,[e.target.name]:e.target.value,
        });
    }

    function onSearchSubmit(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        props.updateReimbursementsFilter(searchState);
        setUpdated(true);
    }

    function onPageChange(e:any) {
        var currentPage = props.currentInfo.currentReimbursementsPage.number;
        switch(e.target.id) {
            case "first":
                currentPage = 0;
                break;
            case "back":
                currentPage -= 1;
                break;
            case "next":
                currentPage += 1;
                break;
            case "last":
                currentPage = props.currentInfo.currentReimbursementsPage.totalPages - 1;
                break;
            default:
                return;
        }
        props.updateReimbursementsFilter({
            ...props.currentInfo.currentReimbursementSearchFilters,
            page:currentPage
        });
        setUpdated(true);
    }

    function onPageSearchEnter(e:any) {
        if (e.key == "Enter") {
            var page:number = parseInt(e.target.value);
            if (page - 1 != props.currentInfo.currentReimbursementsPage.number) {
                if (page < 0) {
                    page = 0;
                } else if (page > props.currentInfo.currentReimbursementsPage.totalPages) {
                    page = props.currentInfo.currentReimbursementsPage.totalPages - 1;
                } else {
                    page -= 1;
                }
                props.updateReimbursementsFilter({
                    ...props.currentInfo.currentReimbursementSearchFilters,
                    page:page
                });
                setUpdated(true);
            }
        }
    }

    function confirmResolve() {
        setOpenConfirm(false);
        setIsLoading(true);
        reimbursementsClient.updateReimbursement({
            ...selectedReimb,
            status:reimbursementsStatus[isApprove?1:2],
            dateResolved:new Date(),
            resolver:props.user.userInfo
        },
            props.user.sessionInfo.jwt)
        .then((resp)=> {
            toast.success("Updated successfully");
            setIsLoading(false);
            setUpdated(true);
        })
        .catch((err) => {
            toast.error("An error ocurred");
            setIsLoading(false);
        });
    }

    // function to trigger confirmation dialog
    function confirmDialog(type:string, r:Reimbursement) {
        setSelectedReimb(r);
        switch(type) {
            case "Approve":
                setIsApprove(true);
                break;
            case "Deny":
                setIsApprove(false);
                break;
        }
        setOpenConfirm(true);
    }

    return (
        <>
            <GeneralTitleComponent message="Reimbursements"/>
            <Spinner animation="border" hidden={!isLoading}/>
            <SearchReimbursementsComponent
            userRole={props.user.sessionInfo.role}
            currentSearchState={searchState}
            searchBy={searchBy}
            setSearchBy={setSearchBy}
            onSearchChange={onSearchChange}
            onSearchSubmit={onSearchSubmit}/>
            <div className="table-responsive col-lg-10 col-md-12 col-sm-12"
            id="reimbursements-table">
                <table 
                hidden={isLoading}
                className="table table-bordered table-dark table-sm">
                    <thead className="thead-light">
                        <tr>
                            <th>Amount</th>
                            <th>Description</th>
                            <th>Submitted on</th>
                            <th>Resolved on</th>
                            <th>Author Name</th>
                            <th>Resolver Name</th>
                            <th>Status</th>
                            <th>Type</th>
                            <th hidden={props.user.sessionInfo.role!="finance"
                        ||props.currentInfo.currentReimbursementSearchFilters.statusId>1}>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.currentInfo.currentReimbursementsPage.content.map((r)=> {
                                return (
                                    <tr key={r.id}>
                                        <td>{r.amount}</td>
                                        <td>{r.description}</td>
                                        <td>{r.dateSubmitted}</td>
                                        <td>{r.dateResolved}</td>
                                        <td>{r.author && r.author.lastName+", "+r.author.firstName}</td>
                                        <td>{r.resolver && r.resolver.lastName+", "+r.resolver.firstName}</td>
                                        <td>{r.status && r.status.name}</td>
                                        <td>{r.type && r.type.name}</td>
                                        {
                                            props.user.sessionInfo.role=="finance"&&
                                            r.status.name=="pending"&&
                                            <td>
                                                <Button
                                                variant="success"
                                                onClick={()=>confirmDialog("Approve", r)}>A</Button>
                                                <Button 
                                                variant="danger"
                                                onClick={()=>confirmDialog("Deny", r)}>D</Button>
                                            </td>
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <PaginationControls
                pageInfo={props.currentInfo.currentReimbursementsPage}
                onPageChange={onPageChange}
                onPageSearchEnter={onPageSearchEnter}/>
                <Dialog
                maxWidth="sm"
                fullWidth
                open={openConfirm}>
                <DialogTitle>
                    {isApprove?"Approve ":"Deny "} Reimbursement?
                </DialogTitle>
                <DialogContent>
                    <ConfirmDialog reimbursementInfo={selectedReimb}/>
                </DialogContent>
                <DialogActions>
                    <Container>
                        <Row>
                            <Col>
                                <Button 
                                variant="primary"
                                onClick={confirmResolve}>Yes</Button>
                            </Col>
                            <Col>
                                <Button 
                                variant="secondary"
                                onClick={()=>setOpenConfirm(false)}>No</Button>
                            </Col>
                        </Row>
                    </Container>
                </DialogActions>
            </Dialog>
            </div>
        </>
    )
}

const mapStateToProps = (state:AppState) => {
    return {
        user:state.user,
        currentInfo:state.currentInfo
    }
}
const mapDispatchToProps = {
    updateReimbursementsPage:updateReimbursementsPage,
    updateReimbursementsFilter:updateReimbursementsFilter
}
export default connect(mapStateToProps, mapDispatchToProps)(ReimbursementsComponent);