import React, { useState, useEffect } from 'react';
import { Table, Spinner } from 'react-bootstrap';
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
import UserRow from './user.row';

interface IUsersProps {
    state:AppState;
    currentInfo:CurrentInfo;
    user:UserState;
    updateUsersPage:(usersPage:Page<User>)=>void;
}

export function UsersComponent(props:IUsersProps) {

    const [loading, setLoading] = useState<boolean>(false);
    const [updated, setUpdated] = useState<boolean>(false);
    const [state, setState]=useState<any>({
        page:0,sortOrders:[],firstNameLike:null,lastNameLike:null,emailMatcher:null,
        usernameMatcher:null
    });

    // Load the users
    useEffect(() => {
        setLoading(true);
        if (!props.currentInfo.currentUsersPage.content.length || updated) {
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
    }, [props.state]);

    return (
        <>
            <GeneralTitleComponent message="Users"/>
            <Spinner animation="border" hidden={!loading}/>
            <Table striped bordered hover responsive="sm" size="sm" variant="dark" hidden={loading}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {props.currentInfo.currentUsersPage.content.map((u) => {
                        return <UserRow user={u} auth={props.user.sessionInfo} key={u.id}/>
                    })}
                </tbody>
            </Table>
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
    updateUsersPage:updateUsersPage
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersComponent);