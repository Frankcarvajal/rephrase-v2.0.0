import React from 'react';

export default function EditButton(props){
  return(
    <button className="edit-button" onClick={props.onClick}>Edit</button>
  );
}