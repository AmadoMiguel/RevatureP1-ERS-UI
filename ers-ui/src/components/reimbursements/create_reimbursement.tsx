import React, { useState } from 'react';
import { Paper} from '@material-ui/core';
import { Container, Row, Col, FormControl, Table, Form, Card, Button, Spinner } from 'react-bootstrap';
import { reimbursementsTypes } from '../../constants/reimbursement_types';
import { ersClient } from '../../clients';
import { reimbursementsClient } from '../../clients/reimbursement-client';
import { UserState } from '../../models/redux_models/UserState';
import { AppState } from '../../models/redux_models/AppState';
import { connect } from 'react-redux';
import { reimbursementsStatus } from '../../constants/reimbursement_status';
import {toast} from 'react-toastify';
import { CurrentInfo } from '../../models/redux_models/CurrentInfo';
import { Page } from '../../models/DTOs/Page';
import { Reimbursement } from '../../models/DTOs/Reimbursement';
import { updateReimbursementsPage } from '../../redux/actions/pages.actions';

interface ICreateReimbursementProps {
    user:UserState;
    currentInfo:CurrentInfo;
    updateReimbursementsPage:(reimbursementsPage:Page<Reimbursement>)=>void;
}

export function CreateReimbursement(props:ICreateReimbursementProps) {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [state, setState] = useState<any>({
        typeId:0, description:'', amount:null
    });

    function handleChange(e:any) {
        setState({
            ...state,[e.target.name]:e.target.value
        })
    }

    function handleSubmit(e:any) {
        e.preventDefault();
        setIsLoading(true);
        reimbursementsClient.createReimbursement({
            amount:state.amount,
            description:state.description,
            type:reimbursementsTypes[parseInt(state.typeId)-1],
            author:props.user.userInfo,status:reimbursementsStatus[0],
            dateSubmitted:new Date()
        }, props.user.sessionInfo.jwt)
        .then((resp)=>{
            props.updateReimbursementsPage({
                ...props.currentInfo.currentReimbursementsPage,
                reFetch:true
            });
            toast.success("Created successfully");
        })
        .catch((err)=> {
            toast.error("An error ocurred");
        })
        .finally(()=>{
            setIsLoading(false);
            setState({typeId:0, description:'', amount:null});
        });
    }

    return (
        <Card className="col-lg-8 col-xs-12" 
        style={{margin:"10px auto"}}>
            <Card.Title>Create Reimbursement</Card.Title>
            <Card.Body>
                <Form className="needs-validation" onSubmit={(e:any)=>handleSubmit(e)}>
                    <Row>
                        <Col lg="4" xs="12">
                            <Form.Group>
                                <Form.Label>Type</Form.Label>
                                <Form.Control 
                                as="select"
                                name="typeId"
                                defaultValue={0}
                                value={state.typeId}
                                onChange={handleChange}
                                isInvalid={state.typeId == 0}
                                required>
                                <option key={0} value={0}>-Select-</option>
                                    {
                                        reimbursementsTypes.map((t)=>{
                                            return <option key={t.id} value={t.id}>{t.name}</option>
                                        })
                                    }
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col lg="8" xs="12">
                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Control 
                                name="description"
                                as="textarea"
                                rows={3}
                                value={state.description}
                                onChange={handleChange}
                                required>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={4} xs={6}>
                            <Form.Group>
                                <Form.Label>Amount</Form.Label>
                                <Form.Control
                                name="amount"
                                type="number"
                                value={state.amount}
                                onChange={handleChange}
                                required>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col lg={4} xs={6} style={{margin:"10px auto"}}>
                            <Spinner animation="border" hidden={!isLoading}></Spinner>
                            <Button type="submit" hidden={isLoading}>
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    )
}

const mapStateToProps = (state:AppState) => {
    return {
        user:state.user,
        currentInfo:state.currentInfo
    }
}

const mapDispatchToProps = {
    updateReimbursementsPage:updateReimbursementsPage
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateReimbursement);