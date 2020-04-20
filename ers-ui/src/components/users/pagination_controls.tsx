import React from 'react';

interface IPaginationProps {
    first:boolean;
    last:boolean;
    number:number;
    handlePreviousPage:()=>void;
    handleNextPage:()=>void;
}

export default function PaginationControls(props:any) {
    return (
        <div style={{margin:"10px auto"}} className="col-lg-4 col-sm-10">
            <div id="pagination-controls">
                <div>
                    {"<<"}
                </div>
                <div>
                    {"<"}
                </div>
                <>
                    <input 
                    type="number" 
                    name="page"
                    style={{width:"6em"}} /> of 12
                </>
                <div>
                    {">"}
                </div>
                <div>
                    {">>"}
                </div>
            </div>
        </div>
    )
}