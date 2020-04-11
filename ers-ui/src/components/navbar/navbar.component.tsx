import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';

export default function NavBarComponent(props:any) {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">
                    <h5 id="App-title"><i id="brand">NextGen</i>ERS</h5>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/users">Users</Nav.Link>
                        <Nav.Link href="/logout">Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}