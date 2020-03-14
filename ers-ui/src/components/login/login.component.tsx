import React, { useState, useEffect } from 'react';
import '../../App.css';
import { FormControl, Typography, CardActions, Button, Paper} from '@material-ui/core';
import { bootstrapGrid, loginFormStyles } from './styles/login.styles';
import LoginInput from './form_elements/input.login';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Lock from '@material-ui/icons/Lock';
import LoginForm from './form_elements/form.login';

export default function LoginComponent(props:any) {
    // Load styles
    const styles = loginFormStyles();

    // Hooks to control the form state
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [warnUsername, setWarnUsername] = useState<boolean>(false);
    const [warnPassword, setWarnPassword] = useState<boolean>(false);
    const [warning, setWarning] = useState<any>({
        required: false,
        error: false
    });

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
            // Perform post request with credentials
        } else {
            setWarnUsername(username == "");
            setWarnPassword(password == "");
        }
    }
    
    return (
        <>
            <Paper className={bootstrapGrid.form}
            id="login-paper">
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
            </Paper>
        </>
    )
}