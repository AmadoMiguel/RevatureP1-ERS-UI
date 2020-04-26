import React, { useState, useEffect } from 'react';
import { Table, Spinner, Row, Button, Col, Container} from 'react-bootstrap';
import GeneralTitleComponent from '../general_title';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CurrentInfo } from '../../models/redux_models/CurrentInfo';
import { UserState } from '../../models/redux_models/UserState';
import { AppState } from '../../models/redux_models/AppState';
import { connect } from 'react-redux';
import { Page } from '../../models/DTOs/Page';
import { User } from '../../models/DTOs/User';
import { updateUsersPage, updateUsersFilter } from '../../redux/actions/pages.actions';
import { userClient } from '../../clients/user-client';
import { AxiosResponse } from 'axios';
import {toast} from 'react-toastify';
import UserBox from './user.box';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { UserProfile } from '../user_info/user_profile';
import UserDialog from './user_dialog';
import PaginationControls from './pagination_controls';
import { SearchUsersComponent } from './search.component';
import { UsersSearchFields } from '../../models/redux_models/UsersSearchFields';

interface IUsersProps {
    currentInfo:CurrentInfo;
    user:UserState;
    updateUsersPage:(usersPage:Page<User>)=>void;
    updateUsersFilter: (usersFilter:UsersSearchFields)=>void;
}

export function UsersComponent(props:IUsersProps) {
    const defaultUser:User = {
        id:0,firstName:"",lastName:"",username:"",password:"",email:"",role:{id:0,name:""}
    }
    const [loading, setLoading] = useState<boolean>(false);
    const [updated, setUpdated] = useState<boolean>(false);
    const [confirmEdit, setConfirmEdit] = useState<boolean>(false);
    const [user, setUser] = useState<User>(defaultUser);
    const [newUser, setNewUser] = useState<User>(defaultUser);
    const [showUser, setShowUser] = useState<boolean>(false);

    // Load the users
    useEffect(() => {
        if (!props.currentInfo.currentUsersPage.content.length || updated) {
            setLoading(true);
            userClient.requestAllUsers(props.currentInfo.currentUserSearchFilters,
                props.user.sessionInfo.jwt)
            .then((resp:AxiosResponse<Page<User>>) => {
                props.updateUsersPage(resp.data);
                setLoading(false);
            })
            .catch((err) => {
                toast(err.response.data);
                setLoading(false);
            });
            setUpdated(false);
        }
    }, [updated]);

    // Function that listens for any search input field change
    // For every new search reset page to 0
    function onStateChange(e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) {
        props.updateUsersFilter({
            ...props.currentInfo.currentUserSearchFilters,
            page:0,
            [e.target.name]:e.target.value
        });
        setUpdated(true);
    }
    // Function that handles page change
    function onPageChange(e:any) {
        let currentPage = props.currentInfo.currentUserSearchFilters.page;
        let numPages = props.currentInfo.currentUsersPage.totalPages;
        switch(e.target.id) {
            case "first":
                props.updateUsersFilter({
                    ...props.currentInfo.currentUserSearchFilters,
                    page:0
                });
                break;
            case "back":
                props.updateUsersFilter({
                    ...props.currentInfo.currentUserSearchFilters,
                    page:currentPage-1
                });
                break;
            case "next":
                props.updateUsersFilter({
                    ...props.currentInfo.currentUserSearchFilters,
                    page:currentPage+1
                });
                break;
            case "last":
                props.updateUsersFilter({
                    ...props.currentInfo.currentUserSearchFilters,
                    page:numPages - 1
                });
                break;
        }
        setUpdated(true);
    }
    // Function that listens for any change in the sorting orders selections
    function onSortChange(e:React.ChangeEvent<HTMLInputElement>) {
        var newSortOrders:string[] = props.currentInfo.currentUserSearchFilters.sortOrders;
        if (newSortOrders.indexOf(e.target.name) != -1) {
            newSortOrders = newSortOrders.filter((s:string)=> s != e.target.name);
        } else {
            newSortOrders.push(e.target.name);
        }
        console.log(newSortOrders);
        props.updateUsersFilter({
            ...props.currentInfo.currentUserSearchFilters,
            sortOrders:newSortOrders
        })
        setUpdated(true);
    }

    // Send request to update current selected user
    async function handleConfirmEdit() {
        // Hide dialogs
        setConfirmEdit(false);
        setShowUser(false);
        setLoading(true);
        await userClient.updateUserInfo(newUser, props.user.sessionInfo.jwt)
        .then((resp)=>{
            toast.success("User information updated");
            setUpdated(true);
        })
        .catch((err)=>{
            toast.error(err.response.data);
            setShowUser(true);
        })
    }

    const handleConfirmClose = () => {
        setConfirmEdit(false);
    }

    return (
        <>
            <GeneralTitleComponent message="Users"/>
            <SearchUsersComponent
            hidden={false}
            searchState={props.currentInfo.currentUserSearchFilters}
            onChange={onStateChange}
            onSortChange={onSortChange}/>
            <div hidden={loading} className="col-xl-9 col-sm-12 col-md-9"
            style={{marginLeft:"auto", marginRight:"auto", padding:"40px"}}>
                {props.currentInfo.currentUsersPage.content.map((u)=>{
                    return (
                        <UserBox key={u.id} user={u} auth={props.user.sessionInfo}
                        setUser={setUser}
                        setShowUser={setShowUser}/>
                    )
                })}
                <PaginationControls 
                pageInfo={props.currentInfo.currentUsersPage}
                onPageChange={onPageChange}/>
            </div>
            <Spinner animation="border" hidden={!loading}/>
            {/* This will pop up when user clicks a particular user box */}
            <Dialog
            fullWidth={true}
            open={showUser}
            onClose={()=>{setShowUser(false)}}>
                <DialogContent>
                    {
                        props.user.sessionInfo.role=="admin"?
                        <UserDialog
                        user={user}
                        setNewUserInfo={setNewUser}
                        setConfirmEdit={setConfirmEdit}/>:
                        <>
                            <DialogTitle>User Info</DialogTitle>
                            <UserProfile
                            className="col-xl-10 col-sm-12"
                            userInfo={user} 
                            hidden={false}/>
                        </>
                    }
                </DialogContent>
            </Dialog>
            {/* This Dialog will pop up when user is about to confirm a change */}
            <Dialog
            open={confirmEdit}
            onClose={handleConfirmClose}>
                <DialogTitle>
                    Are you sure?
                </DialogTitle>
                <DialogActions>
                    <Container>
                        <Row>
                            <Col>
                                <Button 
                                variant="primary"
                                onClick={handleConfirmEdit}>Yes</Button>
                            </Col>
                            <Col>
                                <Button 
                                variant="secondary"
                                onClick={handleConfirmClose}>No</Button>
                            </Col>
                        </Row>
                    </Container>
                </DialogActions>
            </Dialog>
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
    updateUsersPage:updateUsersPage,
    updateUsersFilter:updateUsersFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersComponent);