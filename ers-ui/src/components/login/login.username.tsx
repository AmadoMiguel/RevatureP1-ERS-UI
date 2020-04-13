import React, { useState, useEffect } from 'react';
import '../../App.css';
import { Typography, CardActions, Button, Card, FormControl, createMuiTheme, TextField, InputAdornment} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ArrowRight from '@material-ui/icons/ArrowRight'
import { bootstrapGrid, loginFormStyles } from './styles/login.styles';
import TitleComponent from '../home/title.component';
import { useHistory } from 'react-router-dom';
import { userClient } from '../../clients/user-client';
import { UserAuthentication } from '../../models/redux_models/UserAuthentication';
import { AxiosResponse } from 'axios';
import {toast} from 'react-toastify';
import { updateSessionUser } from '../../redux/actions/users.actions';
import { connect } from 'react-redux';
import { Spinner, Row, Col } from 'react-bootstrap';
import LoginInput from './form_elements/input.login';
import { yellow, blue, red } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/core/styles';

interface ILoginUsernameProps {
    updateSessionUser:(auth:UserAuthentication) => void;
}

export function LoginUsername(props:ILoginUsernameProps) {
    // Load styles
    const styles = loginFormStyles();
    // History
    const history = useHistory();

    // Hooks to control the form state
    const [username, setUsername] = useState<string>("");
    const [warnUsername, setWarnUsername] = useState<boolean>(false);
    const [errUsername, setErrUsername] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const theme = createMuiTheme({
        palette: {
            error: warnUsername?yellow:
            errUsername?red:blue
        }
    });

    function handleChange(value:any) {
        setUsername(value);
        if (warnUsername) {
            setWarnUsername(false);
        }
        if (errUsername) {
            setErrUsername(false);
        }
    }
    
    // Handle login action
    const handleLogin = () => {
        if (username) {
            setLoading(true);
            userClient.loginUser(username)
            .then((resp:AxiosResponse<UserAuthentication>)=>{
                props.updateSessionUser(resp.data);
                setLoading(false);
                history.push("/password");
            })
            .catch((err)=>{
                toast.error(err.response.data);
                setErrUsername(true);
                setLoading(false);
            })
        } else {
            setWarnUsername(true);
        }
    }
    
    return (
        <>
            <TitleComponent/>
            <Card className={bootstrapGrid.form}
            id="login-paper">
                <Typography
                color="textPrimary" variant="h5"
                className={styles.title}>
                    Login
                </Typography> <br/>
                <FormControl variant="outlined">
                    <ThemeProvider theme={theme}>
                        <TextField
                        error={warnUsername||errUsername}
                        type="username"
                        variant="outlined"
                        className={bootstrapGrid.inputFields}
                        label={warnUsername?"required*":
                        errUsername?"incorrect*":"username"}
                        value={username}
                        onChange={(e:any)=>handleChange(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle/>
                                </InputAdornment>
                            )
                        }}/>
                    </ThemeProvider>
                </FormControl>
                <CardActions>
                    <Spinner animation="border" hidden={!loading}/>
                    <Button 
                    id="login-button"
                    className={bootstrapGrid.loginButton}
                    onClick={handleLogin}
                    hidden={loading}>
                        <Row>
                            <Col>
                                <Typography variant="button">Next</Typography>
                            </Col>
                            <Col>
                                <ArrowRight/>
                            </Col>
                        </Row>
                    </Button>
                </CardActions>
                <Row>
                    <Col>
                        <i>Don't have an account? <a href="/signup">Register</a></i>
                    </Col>
                </Row>
            </Card>
        </>
    )
}

// Hook login component actions to redux actions
const mapDispatchToProps = {
    updateSessionUser:updateSessionUser
};
export default connect(null,mapDispatchToProps)(LoginUsername);
