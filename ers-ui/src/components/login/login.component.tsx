import React, { useState, useEffect } from 'react';
import '../../App.css';
import { Typography, CardActions, Button, Card} from '@material-ui/core';
import { bootstrapGrid, loginFormStyles } from './styles/login.styles';
import LoginForm from './form_elements/form.login';
import TitleComponent from '../home/title.component';
import { useHistory } from 'react-router-dom';
import { userClient } from '../../clients/user-client';
import { UserAuthentication } from '../../models/redux_models/UserAuthentication';
import { AxiosResponse } from 'axios';
import {toast} from 'react-toastify';
import { User } from '../../models/DTOs/User';
import { updateUserLoggedIn, updateSessionUser, updateUserInfo } from '../../redux/actions/users.actions';
import { connect } from 'react-redux';
import { AppState } from '../../models/redux_models/AppState';
import { Spinner } from 'react-bootstrap';

interface ILoginProps {
    updateUserLoggedIn:(val:boolean) => void;
    updateSessionUser:(auth:UserAuthentication) => void;
}

export function LoginComponent(props:ILoginProps) {
    // Load styles
    const styles = loginFormStyles();
    // History
    const history = useHistory();

    // Hooks to control the form state
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [warnUsername, setWarnUsername] = useState<boolean>(false);
    const [warnPassword, setWarnPassword] = useState<boolean>(false);
    const [warning, setWarning] = useState<any>({
        required: false,
        error: false
    });
    const [loading, setLoading] = useState<boolean>(false);

    // Any time the username/password changes, the warnings are disabled
    useEffect(() => {
        setWarnUsername(false);
        setWarnPassword(false);
        setWarning({
            required: false,
            error: false
        });
    }, [username, password])
    
    // Handle login action
    const handleLogin = () => {
        if (username && password) {
            setLoading(true);
            userClient.loginUser({
                username:username,
                password:password
            })
            .then((response:AxiosResponse<UserAuthentication>) => {
                // Fill in redux authentication info
                props.updateUserLoggedIn(true);
                props.updateSessionUser(response.data);
                setLoading(false);
                history.push("/");
            })
            .catch((err) => {
                console.log(err);
                // Handle error
                setWarning({
                    ...warning,
                    error: true
                });
                setLoading(false);
                toast.error("Invalid credentials");
            });
        } else {
            setWarnUsername(!username);
            setWarnPassword(!password);
        }
    }
    
    return (
        <>
            <TitleComponent/>
            <Spinner animation="border" hidden={!loading}/>
            <Card className={bootstrapGrid.form}
            id="login-paper"
            hidden={loading}>
                <Typography
                color="textPrimary" variant="h5"
                className={styles.title}>
                    Login
                </Typography> <br/>
                {/* This will wrap the basic login form */}
                <LoginForm 
                username={username}
                setUsername={setUsername}
                warnUsername={warnUsername}
                warning={warning}
                password={password}
                setPassword={setPassword}
                warnPassword={warnPassword}/>
                <CardActions>
                    <Button 
                    id="login-button"
                    className={bootstrapGrid.loginButton}
                    onClick={handleLogin}>
                        <Typography variant="button">
                            Login
                        </Typography>
                    </Button>
                </CardActions>
            </Card>
        </>
    )
}

// Hook login component actions to redux actions
const mapDispatchToProps = {
    updateUserLoggedIn:updateUserLoggedIn,
    updateSessionUser:updateSessionUser
};
export default connect(null,mapDispatchToProps)(LoginComponent);
