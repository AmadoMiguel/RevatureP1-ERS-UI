import React from 'react';
import { User } from '../../models/DTOs/User';
import { UserAuthentication } from '../../models/redux_models/UserAuthentication';
import { roles } from '../../constants/roles';

interface IUserRowProps {
    user:User,
    auth:UserAuthentication
}

export default function UserRow(props:IUserRowProps) {
    return (
        <>
            {
                <tr key={props.user.id}>
                    <td>{props.user.id}</td>
                    <td>
                        {
                            props.auth.role=="admin"?
                            <input
                            placeholder={props.user.firstName} 
                            disabled/>:
                            props.user.firstName
                        }
                    </td>
                    <td>
                        {
                            props.auth.role=="admin"?
                            <input
                            placeholder={props.user.lastName} 
                            disabled/>:
                            props.user.lastName
                        }
                    </td>
                    <td>
                        {
                            props.auth.role=="admin"?
                            <input
                            placeholder={props.user.username} 
                            disabled/>:
                            props.user.username
                        }
                    </td>
                    <td>
                        {
                            props.auth.role=="admin"?
                            <input
                            placeholder={props.user.email} 
                            disabled/>:
                            props.user.email
                        }
                    </td>
                    <td>
                        {
                            props.auth.role=="admin"?
                            <select disabled>
                                {
                                        roles.map((r)=>{
                                            return(
                                                <option key={r.id} 
                                                value={r.id} label={r.name}
                                                selected={props.user.role.name == r.name}/>
                                            )
                                        })
                                    }
                            </select>:
                            props.user.role.name
                        }
                    </td>
                </tr>
            }
        </>
    )
}