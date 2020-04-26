import React from 'react';
import GeneralTitleComponent from '../general_title';
import { CurrentInfo } from '../../models/redux_models/CurrentInfo';

interface IReimbursementsProps {
    currentInfo:CurrentInfo;
}

export function ReimbursementsComponent(props:any) {
    return (
        <>
            <GeneralTitleComponent message="Reimbursements"/>
        </>
    )
}