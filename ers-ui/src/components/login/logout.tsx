import React, { useEffect } from 'react';
import { logoutUser } from '../../redux/actions/users.actions';
import { clearInfo } from '../../redux/actions/pages.actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

interface ILogoutProps {
    logoutUser:()=>void;
    clearInfo:()=>void;
}

export function LogoutComponent(props:ILogoutProps) {

    useEffect(() => {
        props.logoutUser();
        props.clearInfo();
    });

    return (
        <Redirect to="/login"/>
    )
}

const mapDispatchToProps = {
    logoutUser:logoutUser,
    clearInfo:clearInfo
}

export default connect(null, mapDispatchToProps)(LogoutComponent);
