import React, { useState } from 'react';
import { Page } from '../../models/DTOs/Page';
import { User } from '../../models/DTOs/User';

interface IPaginationProps {
    pageInfo: Page<User>;
    onPageSearchEnter:(e:any)=>void;
    onPageChange:(e:any)=>void;
}

export default function PaginationControls(props:IPaginationProps) {
    const [pageSearch, setPageSearch] = useState<any>(
        props.pageInfo.number + 1
    );
    return (
        <div id="pagination-controls" 
        className="col-lg-4 col-md-6 col-sm-6"
        style={{marginLeft:"auto", marginRight:"auto"}}>
            <div 
            id="first"
            className={props.pageInfo.first?"disabled-control":""}
            onClick={ (e) => {
                if (!props.pageInfo.first) {
                    props.onPageChange(e);
                } 
            }}>
                {"<<"}
            </div>
            <div id="back" 
            className={props.pageInfo.first?"disabled-control":""}
            onClick={ (e) => {
                if (!props.pageInfo.first) {
                    props.onPageChange(e);
                } 
            }}>
                {"<"}
            </div>
            <>
                <input
                placeholder={(props.pageInfo.number + 1).toString()}
                type="number"
                name="page"
                max={props.pageInfo.totalPages.toString()}
                style={{width:"6em"}}
                value={pageSearch}
                onChange={(e)=>setPageSearch(e.target.value)}
                onKeyPress={props.onPageSearchEnter}
                /> of {props.pageInfo.totalPages}
            </>
            <div 
            id="next"
            className={props.pageInfo.last?"disabled-control":""}
            onClick={ (e) => {
                if (!props.pageInfo.last) {
                    props.onPageChange(e);
                } 
            }}>
                {">"}
            </div>
            <div
            id="last"
            className={props.pageInfo.last?"disabled-control":""}
            onClick={ (e) => {
                if (!props.pageInfo.last) {
                    props.onPageChange(e);
                } 
            }}>
                {">>"}
            </div>
        </div>
    )
}