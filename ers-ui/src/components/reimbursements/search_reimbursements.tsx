import React from 'react';
import { Container, Row, Col, FormControl, Table, Form, Card, Button } from 'react-bootstrap';
import { InputLabel, Select, MenuItem, TextField, TableHead, TableBody } from '@material-ui/core';
import { reimbursementsStatus } from '../../constants/reimbursement_status';
import { tableStyles } from './styles';
import { CurrentInfo } from '../../models/redux_models/CurrentInfo';
import { ReimbursementsSearch } from '../../models/redux_models/ReimbursementsSearch';

interface ISearchReimbursementsProps {
    currentSearchState:ReimbursementsSearch;
    searchBy:string;
    setSearchBy:(v:any)=>void;
    onSearchChange:(e:any)=>void;
    onSearchSubmit:(e:React.FormEvent<HTMLFormElement>)=>void;
}

export default function SearchReimbursementsComponent(props:ISearchReimbursementsProps) {
    return (
        <Card className="col-lg-10 col-sm-12" style={{margin:'5px auto'}}>
            <Form onSubmit={(e:React.FormEvent<HTMLFormElement>)=>props.onSearchSubmit(e)}>
                <Row>
                    <Col lg={5} xs={6}>
                        <Form.Group className="row">
                            <Form.Label 
                            htmlFor="searchBy"
                            className="col-lg-6 col-sm-6 col-form-label">
                                Search by
                            </Form.Label>
                            <Form.Control 
                            as="select"
                            id="searchBy"
                            name="searchBy"
                            className="col-lg-6 col-sm-6"
                            value={props.currentSearchState.searchBy}
                            onChange={(e)=>props.onSearchChange(e)}
                            required>
                                <option value="status">Status</option>
                                <option value="author">Author Id</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col lg={5} xs={6}>
                        <Form.Group className="row">
                            {
                                props.currentSearchState.searchBy=="status"?
                                <>
                                    <Form.Label 
                                    htmlFor="searchBy"
                                    className="col-lg-6 col-sm-6 col-form-label">
                                        Status
                                    </Form.Label>
                                    <Form.Control
                                    as="select"
                                    name="statusId"
                                    className="col-lg-6 col-sm-6"
                                    value={props.currentSearchState.statusId}
                                    onChange={(e)=>props.onSearchChange(e)}>
                                        <option key={0} value={0}>-Select-</option>
                                        {
                                            reimbursementsStatus.map((r)=>{
                                                return(
                                                    <option key={r.id} value={r.id}>{r.name}</option>
                                                )
                                            })
                                        }
                                    </Form.Control>
                                </>:
                                <>
                                    <Form.Label 
                                    htmlFor="searchBy"
                                    className="col-lg-6 col-sm-6 col-form-label">
                                        Author Id
                                    </Form.Label>
                                    <Form.Control
                                    id="searchBy"
                                    type="number"
                                    className="col-lg-6 col-sm-6"
                                    value={props.currentSearchState.authorId}
                                    name="authorId"
                                    onChange={(e)=>props.onSearchChange(e)}/>
                                </>
                            }
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    {/* Search by date submitted */}
                    <Col lg={5} xs={6}>
                        <Form.Group className="row">
                            <Form.Label
                            htmlFor="searchBy"
                            className="col-lg-6 col-sm-6 col-form-label">
                                Submitted From
                            </Form.Label>
                            <Form.Control
                            type="date"
                            name="startDate"
                            className="col-lg-6 col-sm-6"
                            value={props.currentSearchState.startDate}
                            onChange={(e)=>props.onSearchChange(e)}
                            required={props.currentSearchState.endDate?true:false}/>
                        </Form.Group>
                    </Col>
                    <Col lg={5} xs={6}>
                        <Form.Group className="row">
                            <Form.Label
                            htmlFor="searchBy"
                            className="col-lg-6 col-sm-6 col-form-label">
                                Submitted To
                            </Form.Label>
                            <Form.Control
                            type="date"
                            name="endDate"
                            className="col-lg-6 col-sm-6"
                            value={props.currentSearchState.endDate}
                            onChange={(e)=>props.onSearchChange(e)}
                            required={props.currentSearchState.startDate?true:false}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Button variant="primary" type="submit">Search</Button>
                    </Col>
                </Row>
            </Form>
        </Card>
    )
}
