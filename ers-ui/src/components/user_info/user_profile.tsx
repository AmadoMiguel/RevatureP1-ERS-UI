import React from 'react';
import { Paper, Table, TableHead } from '@material-ui/core';
import { User } from '../../models/DTOs/User';
import { Row, Col } from 'react-bootstrap';

interface IProfileProps {
    hidden:boolean,
    userInfo:User
}

export function UserProfile(props:IProfileProps) {
    return (
        <>
            <Paper
            style={{margin:"10px auto"}}
            className="col-xl-4 col-lg-6 col-sm-6"
            hidden={props.hidden}>
                <Row
                style={{
                    padding:"10px"
                }}>
                    <Col><strong>First Name</strong></Col>
                    <Col>{props.userInfo.firstName}</Col>
                </Row>
                <Row style={{
                    padding:"10px"
                }}>
                    <Col><strong>Last Name</strong></Col>
                    <Col>{props.userInfo.lastName}</Col>
                </Row>
                <Row style={{
                    padding:"10px"
                }}>
                    <Col><strong>Username</strong></Col>
                    <Col>{props.userInfo.username}</Col>
                </Row>
                <Row style={{
                    padding:"10px"
                }}>
                    <Col><strong>Email</strong></Col>
                    <Col>{props.userInfo.email}</Col>
                </Row>
                <Row style={{
                    padding:"10px"
                }}>
                    <Col><strong>Role</strong></Col>
                    <Col>{props.userInfo.role.name}</Col>
                </Row>
            </Paper>
        </>
    )
}
