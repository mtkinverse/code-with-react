import React from 'react'

function Item(props) {
    return (
        <div className='listValues' key={props.name} id={props.name}>
            <li >{props.name}</li>
            <li id='values'>{props.value}</li>
        </div>
    )
}

export default Item
