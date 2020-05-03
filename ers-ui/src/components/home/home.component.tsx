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
import { Typography } from '@material-ui/core';
import GeneralTitleComponent from '../general_title';
import { CurrentInfo } from '../../models/redux_models/CurrentInfo';
import { ReimbursementsSearch } from '../../models/redux_models/ReimbursementsSearch';
import { updateReimbursementsFilter } from '../../redux/actions/pages.actions';

interface IHomeProps {
    userInfo:UserState;
    currentInfo:CurrentInfo,
    updateUserInfo:(user:User) => void;
    updateReimbursementsFilter:(reimbFilter:ReimbursementsSearch)=>void;
}

export function HomeComponent(props:IHomeProps) {

    const [isLoading, setIsLoading] = useState<boolean>(true);

        useEffect(() => {
            if (!props.userInfo.userInfo.id) {
                userClient.findUserByUsername(props.userInfo.sessionInfo.username,
                    props.userInfo.sessionInfo.jwt)
                .then((resp:AxiosResponse<User>) => {
                    props.updateUserInfo(resp.data);
                    if (props.userInfo.sessionInfo.role=="user") {
                        props.updateReimbursementsFilter({
                            ...props.currentInfo.currentReimbursementSearchFilters,
                            searchBy:"author",
                            authorId:resp.data.id
                        })
                    }
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
            <GeneralTitleComponent message="Home"/>
            <Spinner animation="grow" hidden={!isLoading}/>
            <UserProfile 
            className="col-xl-4 col-lg-6 col-sm-6"
            hidden={isLoading}
            userInfo={props.userInfo.userInfo}/>
        </>
    )
}

const mapStateToProps = (state:AppState) => {
    return {
        userInfo:state.user,
        currentInfo:state.currentInfo
    }
}

const mapDispatchToProps = {
    updateUserInfo:updateUserInfo,
    updateReimbursementsFilter:updateReimbursementsFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);