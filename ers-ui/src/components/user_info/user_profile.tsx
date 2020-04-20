import React from 'react';
import { Paper, Table, TableHead } from '@material-ui/core';
import { User } from '../../models/DTOs/User';
import { Row, Col } from 'react-bootstrap';

interface IProfileProps {
    hidden:boolean,
    userInfo:User,
    className:string
}

export function UserProfile(props:IProfileProps) {
    return (
        <>
            <Paper
            style={{margin:"10px auto"}}
            className={props.className}
            hidden={props.hidden}>
                <Row
                style={{
                    padding:"10px"
                }}>
                    <Col><strong>ID</strong></Col>
                    <Col>{props.userInfo.id}</Col>
                </Row>
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
