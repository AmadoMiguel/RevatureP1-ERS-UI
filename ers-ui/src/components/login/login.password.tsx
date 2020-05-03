import React, { useState, useEffect } from 'react';
import '../../App.css';
import { Typography, CardActions, Button, Card, FormControl, createMuiTheme, TextField, InputAdornment} from '@material-ui/core';
import Lock from '@material-ui/icons/Lock';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { bootstrapGrid, loginFormStyles } from './styles/login.styles';
import TitleComponent from '../home/title.component';
import { useHistory } from 'react-router-dom';
import { userClient } from '../../clients/user-client';
import { UserAuthentication } from '../../models/redux_models/UserAuthentication';
import { AxiosResponse } from 'axios';
import {toast} from 'react-toastify';
import { updateSessionUser, updateUserLoggedIn, logoutUser } from '../../redux/actions/users.actions';
import { connect } from 'react-redux';
import { Spinner, Row, Col } from 'react-bootstrap';
import LoginInput from './form_elements/input.login';
import { yellow, blue, red } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/core/styles';
import { AppState } from '../../models/redux_models/AppState';
import { UserState } from '../../models/redux_models/UserState';
import { updateReimbursementsFilter } from '../../redux/actions/pages.actions';
import { ReimbursementsSearch } from '../../models/redux_models/ReimbursementsSearch';
import { CurrentInfo } from '../../models/redux_models/CurrentInfo';

interface ILoginPasswordProps {
    user:UserState,
    updateUserLoggedIn:(val:boolean)=>void;
}

export function LoginPassword(props:ILoginPasswordProps) {
    // Load styles
    const styles = loginFormStyles();
    // History
    const history = useHistory();

    // Hooks to control the form state
    const [password, setpassword] = useState<string>("");
    const [warnpassword, setWarnpassword] = useState<boolean>(false);
    const [errpassword, setErrpassword] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const theme = createMuiTheme({
        palette: {
            error: warnpassword?yellow:
            errpassword?red:blue
        }
    });

    function handleChange(value:any) {
        setpassword(value);
        if (warnpassword) {
            setWarnpassword(false);
        }
        if (errpassword) {
            setErrpassword(false);
        }
    }
    
    const handleBack = () => {
        history.push("/logout");
    }

    // Handle login action
    const handleLogin = () => {
        if (password) {
            setLoading(true);
            userClient.loginPassword(password, props.user.sessionInfo.jwt)
            .then((resp:AxiosResponse<UserAuthentication>)=>{
                props.updateUserLoggedIn(true);
                setLoading(false);
                history.push("/home");
            })
            .catch((err)=>{
                toast.error(err.response.data);
                setErrpassword(true);
                setLoading(false);
            })
        } else {
            setWarnpassword(true);
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
                <Typography
                color="textSecondary" variant="subtitle1"
                className={styles.title}>
                    Hi, {props.user.sessionInfo.username}
                </Typography> <br/>
                <FormControl variant="outlined">
                    <ThemeProvider theme={theme}>
                        <TextField
                        error={warnpassword||errpassword}
                        type="password"
                        variant="outlined"
                        className={bootstrapGrid.inputFields}
                        label={warnpassword?"required*":
                        errpassword?"incorrect*":"password"}
                        value={password}
                        onChange={(e:any)=>handleChange(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock/>
                                </InputAdornment>
                            )
                        }}/>
                    </ThemeProvider>
                </FormControl>
                <CardActions>
                    <Row style={{margin:"10px auto"}}>
                        <Col>
                            <Button 
                                id="login-button"
                                onClick={handleBack}
                                hidden={loading}>
                                    <ArrowBack/>
                            </Button>
                        </Col>
                        <Col>
                            <Spinner animation="border" hidden={!loading}/>
                            <Button 
                            id="login-button"
                            onClick={handleLogin}
                            hidden={loading}>
                                <Typography variant="button">Login</Typography>
                            </Button>
                        </Col>
                    </Row>
                </CardActions>
                <Row>
                    <Typography color="textPrimary"
                    variant="caption" style={{margin:"10px auto"}}>
                        <i><a href="/changePassword">Forgot password?</a></i>
                    </Typography>
                </Row>
            </Card>
        </>
    )
}

const mapStateToProps = (state:AppState) => {
    return {
        user:state.user
    }
}
const mapDispatchToProps = {
    updateUserLoggedIn:updateUserLoggedIn
};
export default connect(mapStateToProps,mapDispatchToProps)(LoginPassword);
