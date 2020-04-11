import React, { useEffect } from 'react';
import { Redirect } from 'react-router';
import { UserAuthentication } from '../../models/redux_models/UserAuthentication';
import { User } from '../../models/DTOs/User';
import { Page, pageModel } from '../../models/DTOs/Page';
import { Reimbursement } from '../../models/DTOs/Reimbursement';
import { updateUserLoggedIn, updateSessionUser, updateUserInfo } from '../../redux/actions/users.actions';
import { updateUsersPage, updateReimbursementsPage } from '../../redux/actions/pages.actions';
import { connect } from 'react-redux';
import { UserState } from '../../models/redux_models/UserState';
import { CurrentInfo } from '../../models/redux_models/CurrentInfo';
import { AppState } from '../../models/redux_models/AppState';

interface ILogoutProps {
    user:UserState,
    currentInfo:CurrentInfo,
    updateUserLoggedIn: (val:boolean) => void;
    updateSessionUser: (auth:UserAuthentication) => void;
    updateUserInfo: (user:User) => void;
    updateUsersPage: (usersPage:Page<User>) => void;
    updateReimbursementsPage: (reimbursementsPage:Page<Reimbursement>) => void;
}

export function LogoutComponent(props:ILogoutProps) {

    useEffect(() => {
        props.updateUserLoggedIn(false);
        props.updateSessionUser({
            username:'',
            role:'',
            jwt:''
        });
        props.updateUserInfo({
            id:0,
            username:'',
            password:'',
            firstName:'',
            lastName:'',
            email:'',
            role:{
                id:0,
                name:''
            }
        });
        props.updateUsersPage(pageModel);
        props.updateReimbursementsPage(pageModel);
    }, []);

    return (
        <Redirect to="/login"/>
    )
}

const mapStateToProps = (state:AppState) => {
    return {
        user:state.user,
        currentInfo:state.currentInfo
    }
}

const mapDispatchToProps = {
    updateUserLoggedIn:updateUserLoggedIn,
    updateSessionUser:updateSessionUser,
    updateUserInfo:updateUserInfo,
    updateUsersPage:updateUsersPage,
    updateReimbursementsPage:updateReimbursementsPage
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutComponent);
