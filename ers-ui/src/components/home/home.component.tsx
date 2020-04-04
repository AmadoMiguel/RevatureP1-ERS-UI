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
import { useHistory } from 'react-router-dom';
import { UserProfile } from '../user_info/user_profile';
import NavBarComponent from '../navbar/navbar.component';

interface IHomeProps {
    userInfo:UserState;
    updateUserInfo:(user:User) => void;
}

export function HomeComponent(props:IHomeProps) {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const history = useHistory();

        useEffect(() => {
            if (!props.userInfo.isLoggedIn) {
                history.push("/login");
            } else if (!props.userInfo.userInfo.id) {
                userClient.findUserByUsername(props.userInfo.sessionInfo.username,
                    props.userInfo.sessionInfo.jwt)
                .then((resp:AxiosResponse<User>) => {
                    props.updateUserInfo(resp.data);
                    toast.success("Welcome, " + resp.data.firstName);
                })
                .catch((err:any) => {
                    toast.error("An error ocurred");
                })
                .finally(() => {
                    setIsLoading(false);
                });
            } else {
                setIsLoading(false);
            }
        }, [])

    return (
        <>
            <NavBarComponent/>
            <TitleComponent/>
            <Spinner animation="grow" hidden={!isLoading}/>
            <UserProfile 
            hidden={isLoading}
            userInfo={props.userInfo.userInfo}/>
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