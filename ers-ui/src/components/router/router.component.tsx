import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import NavBarComponent from '../navbar/navbar.component';
import HomeComponent from '../home/home.component';
import LogoutComponent from '../login/logout';
import { UserState } from '../../models/redux_models/UserState';
import { AppState } from '../../models/redux_models/AppState';
import { connect } from 'react-redux';
import { SignupComponent } from '../login/signup.component';
import PasswordComponent from '../login/password.component';
import LoginUsername from '../login/login.username';
import LoginPassword from '../login/login.password';
import UsersComponent from '../users/users.component';
import ReimbursementsComponent from '../reimbursements/reimbursements.components';

interface IRouterProps {
    user:UserState
}

export function RouterComponent(props:IRouterProps) {
    return (
        <BrowserRouter>
            {props.user.isLoggedIn && <NavBarComponent/>}
            <Switch>
                <Route path="/login" component={LoginUsername}/>
                <Route path="/password" component={LoginPassword}/>
                <Route path="/signup" component={SignupComponent}/>
                <Route path="/changePassword"
                component={props.user.sessionInfo.username?PasswordComponent:
                ()=>{return <><Redirect to="/login"/></>}}/>
                <Route path="/home" component={props.user.isLoggedIn?HomeComponent:
                ()=>{return <><Redirect to="/login"/></>}}/>
                <Route exact path="/" render={()=>(
                    props.user.isLoggedIn ? <Redirect to="/home"/>:
                    <Redirect to="/login"/>
                )}/>
                <Route path="/users" component={props.user.isLoggedIn?UsersComponent:
                ()=>{return <><Redirect to="/login"/></>}} />
                <Route path="/reimbursements" component={props.user.isLoggedIn?
                ReimbursementsComponent:()=>{return <><Redirect to="/login"/></>}} />
                <Route path="/logout"
                component={(props.user.isLoggedIn||props.user.sessionInfo.username)?LogoutComponent:
                    ()=>{return <><Redirect to="/login"/></>}}/>
            </Switch>
        </BrowserRouter>
    )
}

const mapStateToProps = (state:AppState) => {
    return {
        user:state.user
    }
}
export default connect(mapStateToProps)(RouterComponent);