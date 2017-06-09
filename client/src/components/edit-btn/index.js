import React from 'react'

export default function EditButton(props){
  return(
    <button className="edit-button" onClick={props.onClick}>Edit</button>
    // <i className="fa fa-pencil-square-o" aria-hidden="true" onClick={props.onClick}></i>
  )
}