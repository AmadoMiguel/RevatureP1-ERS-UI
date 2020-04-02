import React from 'react';

export default function TitleComponent(props:any) {
    return (
        <div hidden={props.hide}>
            {/* General title */}
            <header className="App-header">
                <h1 id="App-title"><i id="next-gen">NextGen</i>ERS</h1>
            </header>
        </div>
    )
}