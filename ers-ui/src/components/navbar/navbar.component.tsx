import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import { UserState } from '../../models/redux_models/UserState';
import { AppState } from '../../models/redux_models/AppState';
import { connect } from 'react-redux';

interface INavbarProps {
    user:UserState;
}

export function NavBarComponent(props:INavbarProps) {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/home">
                    <h5 id="App-title"><i id="brand">NextGen</i>ERS</h5>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {
                            (props.user.sessionInfo.role=="admin"||
                            props.user.sessionInfo.role=="finance")&&
                        <Nav.Link href="/users">Users</Nav.Link>
                        }
                        {
                            (props.user.sessionInfo.role=="finance") &&
                            <Nav.Link href="/reimbursements">Reimbursements</Nav.Link>
                        }
                        <Nav.Link href="/logout">Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

const mapStateToProps = (state:AppState) => {
    return {
        user:state.user
    }
}
export default connect(mapStateToProps)(NavBarComponent);