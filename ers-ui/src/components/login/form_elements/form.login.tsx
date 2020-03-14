import React from 'react';
import { FormControl } from '@material-ui/core';
import LoginInput from './input.login';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Lock from '@material-ui/icons/Lock';

export default function LoginForm(props:any) {
    return (
        <>
            <FormControl variant="outlined">
                    <LoginInput 
                    value={props.username}
                    onChange={props.setUsername}
                    type="text"
                    helperText={props.warnUsername? "required *": "username"}
                    warning={{...props.warning, required:props.warnUsername}}
                    icon={<AccountCircle />}/> <br/>
                    <LoginInput 
                    value={props.password}
                    onChange={props.setPassword}
                    type="password"
                    helperText={props.warnPassword? "required *": "password"}
                    warning={{...props.warning, required:props.warnPassword}}
                    icon={<Lock />}/>
            </FormControl>
        </>
    )
}