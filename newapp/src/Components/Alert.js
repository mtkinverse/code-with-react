import React from 'react'

function Alert(props) {
 
  return (
    <div style={{height:'50px'}}>
    {props.alert && <div className={`alert alert-${props.alert.alertType} alert-dismissible fade show`} role="alert">
    <strong>{props.alert.alertMsg}</strong>
  </div>}
  </div>
)
}

export default Alert
