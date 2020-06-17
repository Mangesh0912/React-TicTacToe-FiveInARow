import React from 'react';

export const Box = (props: any) => {
    return(
        <button className="board-box" onClick={props.onClick}>
             {props.value}
        </button>
    )
}