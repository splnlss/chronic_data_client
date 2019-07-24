import React from 'react';
import { Link } from 'react-router-dom';

function card(props){
  const style ={
    backgroundColor: "white",
    padding: '2px 2px 2px 8px',
    margin: '4px',
    borderRadius: '4px'
    // border: '1px solid lightgrey'
  }

  return (
    <div key={props.id} style={style}>
        <li><h3><Link to={`/documents/${props.id}`}>{props.name.toUpperCase()}</Link></h3>
         {props.provider}
        </li>
    </div>

  )
}

export default card;