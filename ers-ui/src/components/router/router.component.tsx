import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBarComponent from '../navbar/navbar.component';
import HomeComponent from '../home/home.component';
import LoginComponent from '../login/login.component';


export default class Router extends React.Component <any, any> {
    render () {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/"> <HomeComponent/> </Route>
                        <Route path="/login"> <LoginComponent/> </Route>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}