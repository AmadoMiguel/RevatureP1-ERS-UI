import React, { useEffect, useState } from 'react';
import TitleComponent from './title.component';
import { User } from '../../models/DTOs/User';
import { AppState } from '../../models/redux_models/AppState';
import { updateUserInfo } from '../../redux/actions/users.actions';
import { connect } from 'react-redux';
import { userClient } from '../../clients/user-client';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { UserState } from '../../models/redux_models/UserState';
import { Spinner } from 'react-bootstrap';

interface IHomeProps {
    userInfo:UserState;
    updateUserInfo:(user:User) => void;
}

export function HomeComponent(props:IHomeProps) {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    
    if (!props.userInfo.isLoggedIn) {
        useEffect(() => {
            userClient.findUserByUsername(props.userInfo.sessionInfo.username,
                props.userInfo.sessionInfo.jwt)
            .then((resp:AxiosResponse<User>) => {
                props.updateUserInfo(resp.data);
                toast.success("Welcome " + resp.data.firstName);
                setIsLoading(false);
            })
            .catch((err:any) => {
                console.log(err);
                toast.error("An error ocurred");
            });
        }, [])
    }

    useEffect(() => {
        setIsLoading(false);
    }, [])

    return (
        <>
            <Spinner animation="border" hidden={!isLoading}/>
            <TitleComponent hide={isLoading} />
        </>
    )
}

const mapStateToProps = (state:AppState) => {
    return {
        userInfo:state.user
    }
}

const mapDispatchToProps = {
    updateUserInfo:updateUserInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);