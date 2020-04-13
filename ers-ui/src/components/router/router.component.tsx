import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
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

interface IRouterProps {
    user:UserState
}

export function RouterComponent(props:IRouterProps) {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                <Route path="/login"> <LoginUsername/> </Route>
                <Route path="/password"> <LoginPassword/> </Route>
                <Route path="/signup"><SignupComponent/></Route>
                <Route path="/changePassword"><PasswordComponent/></Route>
                <Route path="/logout"> <LogoutComponent/> </Route>
                    {
                        props.user.isLoggedIn &&
                        <>
                            <NavBarComponent/>
                            <Route exact path="/"> <HomeComponent/> </Route>
                        </>
                    }
                </Switch>
            </BrowserRouter>
        </div>
    )
}

const mapStateToProps = (state:AppState) => {
    return {
        user:state.user
    }
}
export default connect(mapStateToProps)(RouterComponent);