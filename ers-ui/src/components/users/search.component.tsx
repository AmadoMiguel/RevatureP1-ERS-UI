import React from 'react';
import { Container, Row, Col, FormLabel } from 'react-bootstrap';
import { Select, InputLabel, Checkbox, TableHead, Table, TableRow, TableCell, makeStyles, Paper, TableBody, TextField } from '@material-ui/core';
import { roles } from '../../constants/roles';
import { UsersSearchFields } from '../../models/redux_models/UsersSearchFields';

interface ISearchUsersProps {
    hidden:boolean;
    searchState:UsersSearchFields;
    onChange:(e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>void;
    onSortChange:(e:React.ChangeEvent<HTMLInputElement>)=>void;
}

export function SearchUsersComponent(props:ISearchUsersProps) {
    const useStyles = makeStyles(theme => ({
        root: {
            width: '80%',
            margin:"10px auto"
        },
        paper: {
          marginTop: theme.spacing(3),
          width: '80%',
          overflowX: 'auto',
          marginBottom: theme.spacing(2)
        },
        table: {
          whiteSpace:"nowrap"
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
      }));
    const classes = useStyles();
    return (
        <div hidden={props.hidden} className={classes.root}>
            <table 
            className="table table-bordered table-responsive"
            style={{whiteSpace:"nowrap"}}>
                <thead>
                    <tr>
                        <td></td>
                        <td>First Name</td>
                        <td>Last Name</td>
                        <td>Username</td>
                        <td>Email</td>
                        <td>Role</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Search By:</td>
                        <td>
                            <input
                            className="form-control"
                            value={props.searchState.firstNameLike}
                            name="firstNameLike"
                            onChange={(e)=>props.onChange(e)}/>
                        </td>
                        <td>
                            <input
                            className="form-control"
                            value={props.searchState.lastNameLike}
                            name="lastNameLike"
                            onChange={(e)=>props.onChange(e)}/>
                        </td>
                        <td>
                            <input
                            className="form-control"
                            value={props.searchState.usernameMatcher}
                            name="usernameMatcher"
                            onChange={(e)=>props.onChange(e)}/>
                        </td>
                        <td>
                            <input
                            className="form-control"
                            value={props.searchState.emailMatcher}
                            name="emailMatcher"
                            onChange={(e)=>props.onChange(e)}/>
                        </td>
                        <td>
                            <Select
                                defaultValue={0}
                                value={props.searchState.roleId}
                                onChange={(e:any)=>props.onChange(e)}
                                name="roleId">
                                    <option key={0} value={0}>--Select--</option>
                                    {
                                        roles.map((r)=>{
                                            return(
                                                <option key={r.id} value={r.id}>{r.name}</option>
                                            )
                                        })
                                    }
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td>Sort By:</td>
                        <td>
                            <Checkbox
                            name="firstName"
                            checked={props.searchState.sortOrders.indexOf("firstName") != -1}
                            onChange={(e)=>props.onSortChange(e)}/>
                        </td>
                        <td>
                            <Checkbox
                            name="lastName"
                            checked={props.searchState.sortOrders.indexOf("lastName") != -1}
                            onChange={(e)=>props.onSortChange(e)}/>
                        </td>
                        <td>
                            <Checkbox
                            name="username"
                            checked={props.searchState.sortOrders.indexOf("username") != -1}
                            onChange={(e)=>props.onSortChange(e)}/>
                        </td>
                        <td>
                            <Checkbox
                            name="email"
                            checked={props.searchState.sortOrders.indexOf("email") != -1}
                            onChange={(e)=>props.onSortChange(e)}/>
                        </td>
                        <td>
                            <Checkbox
                            name="role"
                            checked={props.searchState.sortOrders.indexOf("role") != -1}
                            onChange={(e)=>props.onSortChange(e)}/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}