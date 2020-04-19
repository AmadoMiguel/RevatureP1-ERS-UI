import React from 'react';

export default function GeneralTitleComponent(props:any) {
    return (
        <div hidden={props.hide}>
            {/* General title */}
            <header className="App-header">
                <h2 id="App-title">{props.message}</h2>
            </header>
        </div>
    )
}