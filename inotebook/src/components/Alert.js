import React,{ useContext } from 'react'
import noteContext from '../context/notes/noteContext'

function Alert() {
const context = useContext(noteContext);
const {AlertContent} = context; 
  return (
    <div style={{height:'50px'}}>
    {AlertContent && <div className={`alert alert-${AlertContent.type} alert-dismissible fade show`} role="alert">
    <strong>{AlertContent.message}</strong>
  </div>}
  </div>
)
}

export default Alert
