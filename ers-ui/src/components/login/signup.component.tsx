import React, { useState, FormEvent } from 'react';
import { roles } from '../../constants/roles';
import { Form, Col, Row, Button, Spinner } from 'react-bootstrap';
import { Card, Typography } from '@material-ui/core';
import TitleComponent from '../home/title.component';
import {toast} from 'react-toastify';
import { userClient } from '../../clients/user-client';
import { AxiosResponse, AxiosError } from 'axios';
import { useHistory } from 'react-router';

export function SignupComponent(props:any) {
    const [userInfo, setUserInfo] = useState<any>({
        firstName:'',
        lastName:'',
        username:'',
        email:'',
        password:'',
        confirmedPass:'',
        role:'1'
    });
    const [loading, setLoading] = useState<boolean>(false);
    const history = useHistory();

    const emailPattern = new RegExp("[a-zA-Z]+@[a-z]+\\.[a-z]{2,3}");

    function handleChange(e:any) {
        setUserInfo({
            ...userInfo,
            [e.target.name]:e.target.value
        });
    }

    async function handleSubmit(event:FormEvent<HTMLFormElement>) {
        setLoading(true);
        event.preventDefault();
        await userClient.registerNewUser({
            firstName:userInfo.firstName,
            lastName:userInfo.lastName,
            username:userInfo.username,
            email:userInfo.email,
            password:userInfo.password,
            role:roles[parseInt(userInfo.role) - 1]
        })
        .then((resp)=> {
            toast.success("Successfully registered");
            setLoading(false);
            history.push("/login");
        })
        .catch((err:any)=>{
            toast.error(err.response.data);
            setLoading(false);
        });
    }

    return (
        <>
            <TitleComponent/>
            <Card className="col-xl-6 col-sm-12" style={{margin:'5px auto'}}>
                <Typography gutterBottom variant="h5">Register</Typography>
                <Form className="needs-validation"
                onSubmit={(e:FormEvent<HTMLFormElement>)=>handleSubmit(e)}>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Control placeholder="First Name"
                                name="firstName"
                                value={userInfo.firstName}
                                onChange={handleChange}
                                required
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Control placeholder="Last Name"
                                name="lastName"
                                value={userInfo.lastName}
                                onChange={handleChange}
                                required/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Control placeholder="Username"
                                name="username"
                                value={userInfo.username}
                                onChange={handleChange}
                                required/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Control type="email"
                                name="email"
                                placeholder="Email"
                                pattern="[a-zA-Z]+@[a-z]+\.[a-z]{2,3}"
                                value={userInfo.email}
                                onChange={handleChange}
                                isValid={userInfo.email?emailPattern.test(userInfo.email):false}
                                isInvalid={userInfo.email?!emailPattern.test(userInfo.email):false}
                                required/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Control type="password"
                                name="password"
                                placeholder="Password"
                                onChange={handleChange}
                                value={userInfo.password} required/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Control type="password"
                                name="confirmedPass"
                                placeholder="Confirm password"
                                isValid={userInfo.confirmedPass?
                                    userInfo.confirmedPass==userInfo.password:
                                    false}
                                isInvalid={userInfo.confirmedPass?
                                    userInfo.confirmedPass!=userInfo.password:
                                    false}
                                pattern={userInfo.password}
                                onChange={handleChange}
                                value={userInfo.confirmedPass} required/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Control as="select"
                                name="role"
                                placeholder="Role"
                                value={userInfo.role}
                                onChange={handleChange} required>
                                    {
                                        roles.map((r)=>{
                                            return(
                                                <option key={r.id} 
                                                value={r.id} label={"Role: " + r.name}/>
                                            )
                                        })
                                    }
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            {
                                loading?
                                <Spinner animation="border"/>:
                                <Button type="submit">Register</Button>
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <>
                                <i>Already have and account? <a href="/Login">Login</a></i>
                            </>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </>
    )
}
