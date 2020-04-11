import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBarComponent from '../navbar/navbar.component';
import HomeComponent from '../home/home.component';
import LoginComponent from '../login/login.component';
import LogoutComponent from '../login/logout';
import { UserState } from '../../models/redux_models/UserState';
import { AppState } from '../../models/redux_models/AppState';
import { connect } from 'react-redux';

interface IRouterProps {
    user:UserState
}

export function RouterComponent(props:IRouterProps) {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                <Route path="/login"> <LoginComponent/> </Route>
                    {
                        props.user.isLoggedIn &&
                        <>
                            <NavBarComponent/>
                            <Route exact path="/"> <HomeComponent/> </Route>
                            <Route path="/logout"> <LogoutComponent/> </Route>
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