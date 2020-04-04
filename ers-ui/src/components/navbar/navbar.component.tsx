import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';

export default function NavBarComponent(props:any) {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>
                    <h5 id="App-title"><i id="brand">NextGen</i>ERS</h5>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}