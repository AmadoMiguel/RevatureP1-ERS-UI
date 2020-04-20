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
import { updateUsersPage } from '../../redux/actions/pages.actions';
import { userClient } from '../../clients/user-client';
import { AxiosResponse } from 'axios';
import {toast} from 'react-toastify';
import UserBox from './user.box';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { UserProfile } from '../user_info/user_profile';
import UserDialog from './user_dialog';
import PaginationControls from './pagination_controls';

interface IUsersProps {
    state:AppState;
    currentInfo:CurrentInfo;
    user:UserState;
    updateUsersPage:(usersPage:Page<User>)=>void;
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

    // Filtering and page state
    const [state, setState]=useState<any>({
        page:0,sortOrders:[],firstNameLike:null,lastNameLike:null,emailMatcher:null,
        usernameMatcher:null
    });

    // Load the users
    useEffect(() => {
        if (!props.currentInfo.currentUsersPage.content.length || updated) {
            setLoading(true);
            userClient.requestAllUsers(state.page,state.sortOrders,state.firstNameLike,
                state.lastNameLike,state.emailMatcher,state.usernameMatcher,props.user.sessionInfo.jwt)
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
    }, [props.state, updated, state]);

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
            <Spinner animation="border" hidden={!loading}/>
            <PaginationControls
             />
            <div hidden={loading} className="col-xl-9 col-sm-12 col-md-9" style={{margin:"10px auto"}}>
                {props.currentInfo.currentUsersPage.content.map((u)=>{
                    return (
                        <UserBox key={u.id} user={u} auth={props.user.sessionInfo}
                        setUser={setUser}
                        setShowUser={setShowUser}/>
                    )
                })}
            </div>
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
                        setConfirmEdit={setConfirmEdit}
                        />:
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
                                onClick={handleConfirmEdit}
                                >Yes</Button>
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
        currentInfo:state.currentInfo,
        state:state
    }
}
const mapDispatchToProps = {
    updateUsersPage:updateUsersPage
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersComponent);