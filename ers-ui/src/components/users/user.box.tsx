import React, { useState } from 'react';
import { User } from '../../models/DTOs/User';
import { UserAuthentication } from '../../models/redux_models/UserAuthentication';
import { roles } from '../../constants/roles';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row } from 'react-bootstrap';

interface IUserBoxProps {
    user:User;
    auth:UserAuthentication;
    setUser:(user:User)=>void;
    setShowUser:(state:boolean)=>void;
}

export default function UserBox(props:IUserBoxProps) {
    const handleClick = () => {
        props.setShowUser(true);
        props.setUser(props.user);
    }
    return (
        <div className="col-xl-3 col-sm-6 col-md-3 user-box" onClick={handleClick}>
            First Name: {props.user.firstName}
            <div id="hover-info">
                <Row>Last Name: {props.user.lastName}</Row>
                <Row>Username: {props.user.username}</Row>
                <Row>Email: {props.user.email}</Row>
            </div>
        </div>
    )
}