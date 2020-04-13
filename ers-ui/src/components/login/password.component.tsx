import React, { useState, FormEvent } from 'react';
import { Form, Row, Col, Spinner, Button } from 'react-bootstrap';
import { Card, Typography } from '@material-ui/core';
import TitleComponent from '../home/title.component';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router';
import { UserState } from '../../models/redux_models/UserState';
import { AppState } from '../../models/redux_models/AppState';
import { connect } from 'react-redux';
import { userClient } from '../../clients/user-client';
import {toast} from 'react-toastify';

interface IPasswordsComponent {
    user:UserState;
}

export function PasswordComponent(props:IPasswordsComponent) {

    const [passwords, setPasswords] = useState({
        oldPassword:'',
        newPassword:'',
        confirmNew:'',
    });
    const [loading, setLoading] = useState<boolean>(false);
    const history = useHistory();

    function handleChange(e:any) {
        setPasswords({
            ...passwords,
            [e.target.name]:e.target.value
        });
    }

    function handleSubmit(e:FormEvent<HTMLFormElement>) {
        setLoading(true);
        e.preventDefault();
        userClient.changePassword({
            oldPassword:passwords.oldPassword,
            newPassword:passwords.newPassword
        }, props.user.sessionInfo.jwt)
        .then((resp)=>{
            toast.success("Password updated");
            setLoading(false);
            history.push("/password");
        })
        .catch((err)=>{
            setLoading(false);
            toast.error(err.response.data);
        });
    }

    const handleBack = () => {
        setLoading(true);
        history.push("/password");
    }

    return (
        <>
            <TitleComponent/>
            <Card className="col-xl-4 col-sm-8" style={{margin:'5px auto'}}>
                <Typography gutterBottom variant="h5">Change Password</Typography>
                <Form onSubmit={handleSubmit} className="needs-validation">
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Control placeholder="Current password"
                                type="password"
                                name="oldPassword"
                                value={passwords.oldPassword}
                                onChange={handleChange}
                                required/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Control placeholder="New password"
                                type="password"
                                name="newPassword"
                                value={passwords.newPassword}
                                onChange={handleChange}
                                required/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Control placeholder="Confirm password"
                                type="password"
                                name="confirmNew"
                                isInvalid={passwords.confirmNew?
                                passwords.confirmNew!=passwords.newPassword:false}
                                isValid={passwords.confirmNew?
                                passwords.confirmNew==passwords.newPassword:false}
                                pattern={passwords.newPassword}
                                value={passwords.confirmNew}
                                onChange={handleChange}
                                required/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Spinner animation="border" hidden={!loading}/>
                        <Col>
                            <Button
                                variant="link"
                                onClick={handleBack}
                                hidden={loading}>
                                    <ArrowBack/>
                            </Button>
                        </Col>
                        <Col>
                            <Button type="submit" hidden={loading}>Update</Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </>
    )
}

const mapStateToProps = (state:AppState) => {
    return {
        user:state.user
    }
}

export default connect(mapStateToProps)(PasswordComponent);
