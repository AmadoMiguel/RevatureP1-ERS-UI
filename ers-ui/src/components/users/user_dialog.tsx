import React, { useState } from 'react';
import { User } from '../../models/DTOs/User';
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import { Typography } from '@material-ui/core';
import { roles } from '../../constants/roles';
import { pencilTool, pencilPath, removeTool, removePath, undoTool, undoPath, okTool, okPath } from '../../assets/svg_icons';

interface IUserDialogProps {
    user:User;
    setNewUserInfo:(user:User)=>void;
    setConfirmEdit:(val:boolean)=>void;
}

export default function UserDialog(props:IUserDialogProps) {
    const [userInfo, setUserInfo] = useState<any>({
        firstName:props.user.firstName,
        lastName:props.user.lastName,
        username:props.user.username,
        email:props.user.email,
        role:props.user.role.id.toString()
    });
    // Controls for the form
    const [disabled, setDisabled] = useState<boolean>(true);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [isDelete, setIsDelete] = useState<boolean>(false);

    function handleChange(e:any) {
        setUserInfo({
            ...userInfo,
            [e.target.name]:e.target.value
        });
    }

    const handleDisable = () => {
        setDisabled(true);
        // Reset to initial user info
        setUserInfo({
            ...props.user, role:props.user.role.id.toString()
        });
    }

    const handleEditClick = () => {
        props.setConfirmEdit(true);
        props.setNewUserInfo({
            ...props.user,...userInfo,role:roles[parseInt(userInfo.role) - 1]
        });
    }
    return (
        <>
            <Form className="needs-validation">
                <Typography gutterBottom variant="h6">User Id: {props.user.id}</Typography>
                <Container fluid={true}>
                    <Row>
                        <Col lg="4" xs="3">First Name</Col>
                        <Col lg="7" xs="9">
                            <Form.Group>
                                <Form.Control
                                name="firstName"
                                value={userInfo.firstName}
                                onChange={handleChange}
                                disabled={disabled}
                                required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="4" xs="3">Last Name</Col>
                        <Col lg="7" xs="9">
                            <Form.Group>
                                <Form.Control
                                name="lastName"
                                value={userInfo.lastName}
                                onChange={handleChange}
                                disabled={disabled}
                                required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="4" xs="3">Username</Col>
                        <Col lg="7" xs="9">
                            <Form.Group>
                                <Form.Control
                                name="username"
                                value={userInfo.username}
                                onChange={handleChange}
                                disabled={disabled}
                                required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="4" xs="3">Email</Col>
                        <Col lg="7" xs="9">
                            <Form.Group>
                                <Form.Control
                                name="email"
                                value={userInfo.email}
                                onChange={handleChange}
                                disabled={disabled}
                                required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="4" xs="3">Role</Col>
                        <Col lg="7" xs="9">
                            <Form.Group>
                                <Form.Control as="select"
                                name="role"
                                placeholder="Role"
                                value={userInfo.role}
                                onChange={handleChange} required
                                disabled={disabled}>
                                    {
                                        roles.map((r)=>{
                                            return(
                                                <option key={r.id}
                                                value={r.id} label={r.name}/>
                                            )
                                        })
                                    }
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    {/* Form buttons */}
                    <Row>
                        <Col lg="2" xl="2" xs="4">
                            {
                                disabled?
                                <Button
                                onClick={()=>{setDisabled(false)}}>
                                    <svg xmlns={pencilTool}
                                        width="24" height="24" viewBox="0 0 24 24">
                                        <path d={pencilPath} />
                                    </svg>
                                </Button>:
                                <Button variant="secondary"
                                onClick={handleDisable}>
                                    <svg xmlns={undoTool}
                                        width="24" height="24" viewBox="0 0 24 24">
                                        <path d={undoPath} />
                                    </svg>
                                </Button>
                            }
                        </Col>
                        <Col lg="2" xl="2" xs="4">
                            {
                                (!disabled) &&
                                <Button
                                variant="success"
                                onClick={handleEditClick}>
                                    <svg xmlns={okTool}
                                        width="24" height="24" viewBox="0 0 24 24">
                                        <path d={okPath} />
                                    </svg>
                                </Button>
                            }
                        </Col>
                    </Row>
                </Container>
            </Form>
        </>
    )
}