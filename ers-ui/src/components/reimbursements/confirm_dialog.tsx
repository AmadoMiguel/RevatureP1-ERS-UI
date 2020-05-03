import React from 'react';
import { Paper } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';
import { Reimbursement } from '../../models/DTOs/Reimbursement';

interface IConfirmReimbursementProps {
    reimbursementInfo:Reimbursement;
}

export default function ConfirmDialog(props:IConfirmReimbursementProps) {
    return (
        <Paper
            style={{margin:"10px auto"}}
            className="col-xl-10 col-sm-12">
                <Row
                style={{padding:"10px"}}>
                    <Col><strong>Amount</strong></Col>
                    <Col>{props.reimbursementInfo.amount}</Col>
                </Row>
                <Row
                style={{padding:"10px"}}>
                    <Col><strong>Description</strong></Col>
                    <Col>{props.reimbursementInfo.description}</Col>
                </Row>
                <Row style={{padding:"10px"}}>
                    <Col><strong>Type</strong></Col>
                    <Col>{props.reimbursementInfo.type.name}</Col>
                </Row>
                <Row style={{padding:"10px"}}>
                    <Col><strong>Author</strong></Col>
                    <Col>{props.reimbursementInfo.author.lastName},
                    {props.reimbursementInfo.author.firstName}</Col>
                </Row>
                <Row style={{padding:"10px"}}>
                    <Col><strong>Status</strong></Col>
                    <Col>{props.reimbursementInfo.status.name}</Col>
                </Row>
                <Row style={{padding:"10px"}}>
                    <Col><strong>Submitted on</strong></Col>
                    <Col>{props.reimbursementInfo.dateSubmitted}</Col>
                </Row>
            </Paper>
    )
}