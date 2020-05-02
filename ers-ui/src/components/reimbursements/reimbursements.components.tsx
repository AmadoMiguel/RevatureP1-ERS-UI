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
import { Select, InputLabel, MenuItem, FormControl, Input, TextField, RadioGroup, FormLabel, FormControlLabel, Radio, TableHead, TableBody } from '@material-ui/core';
import { reimbursementsStatus } from '../../constants/reimbursement_status';
import { tableStyles } from './styles';
import { pencilTool, pencilPath } from '../../assets/svg_icons';
import SearchReimbursementsComponent from './search_reimbursements';

interface IReimbursementsProps {
    user:UserState;
    currentInfo:CurrentInfo;
    updateReimbursementsPage: (reimbursementsPage:Page<Reimbursement>) =>void;
    updateReimbursementsFilter: (reimbFilter:ReimbursementsSearch) => void;
}

export function ReimbursementsComponent(props:IReimbursementsProps) {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [updated, setUpdated] = useState<boolean>(false);
    const [searchBy, setSearchBy] = useState<any>("status");
    const [searchState, setSearchState] = useState<ReimbursementsSearch>(
        {...props.currentInfo.currentReimbursementSearchFilters}
    );
    // const styles = tableStyles();

    // load reimbursements
    useEffect(() => {
        if (props.user.sessionInfo.role == "finance") {
            if (!props.currentInfo.currentReimbursementsPage.content.length || updated) {
                setIsLoading(true);
                if (props.currentInfo.currentReimbursementSearchFilters.searchBy=="status") {
                    reimbursementsClient.findReimbursementsByStatusId(
                        props.currentInfo.currentReimbursementSearchFilters, props.user.sessionInfo.jwt)
                    .then((resp:AxiosResponse<Page<Reimbursement>>) => {
                        props.updateReimbursementsPage(resp.data);
                        setIsLoading(false);
                        setUpdated(false);
                    })
                    .catch((err)=>{
                        toast.error("An error ocurred");
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
                        setUpdated(false);
                    })
                }
            }
        } else {
            // Request reimbursements for current user id
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

    // function to trigger confirmation dialog
    function confirmDialog(type:string) {

    }

    return (
        <>
            <GeneralTitleComponent message="Reimbursements"/>
            <Spinner animation="border" hidden={!isLoading}/>
            <SearchReimbursementsComponent 
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
                            <th>Description</th>
                            <th>Submitted on</th>
                            <th>Resolved on</th>
                            <th>Author Name</th>
                            <th>Resolver Name</th>
                            <th>Status</th>
                            <th>Type</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.currentInfo.currentReimbursementsPage.content.map((r)=> {
                                return (
                                    <tr key={r.id}>
                                        <td>{r.description}</td>
                                        <td>{r.dateSubmitted}</td>
                                        <td>{r.dateResolved}</td>
                                        <td>{r.author && r.author.lastName+", "+r.author.firstName}</td>
                                        <td>{r.resolver && r.resolver.lastName+", "+r.resolver.firstName}</td>
                                        <td>{r.status && r.status.name}</td>
                                        <td>{r.status && r.type.name}</td>
                                        {
                                            props.user.sessionInfo.role=="finance"&&
                                            r.status.name=="pending"&&
                                            <td>
                                                <Button
                                                variant="success"
                                                onClick={()=>confirmDialog("Approve")}>A</Button>
                                                <Button 
                                                variant="danger"
                                                onClick={()=>confirmDialog("Deny")}>D</Button>
                                            </td>
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    <tfoot></tfoot>
                </table>
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