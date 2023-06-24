import React from 'react'
import { Link } from 'react-router-dom';
export default function Navbar(props) {
 

  return (

<div className="navbar border border-dark m-2" data-bs-theme="dark" style={{backgroundColor : props.DarkLight.backgroundColor}}>
    <div className="navbar-brand" style={props.DarkLight}>
      <img src={props.ImgLink} alt='Unavailable' height="30px" className='mx-1'/>
      <b>{props.Title}</b>
      </div>
   <div>
    <ul style={props.DarkLight} >
      <li style={props.DarkLight}><Link to="/" style={props.DarkLight} >Home</Link></li>
      <li style={props.DarkLight}><Link to="/about" style={props.DarkLight} >About</Link></li>
      <div className={`border border-${props.DarkLight.backgroundColor === 'white' ? 'dark' : 'light'}`}>
       <div className="form-check form-switch mx-1" style={props.DarkLight} >
        {props.Mode}
        <input className="form-check-input " type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={props.ChangeMode}/>
        </div>
        </div>
      
    </ul>
        </div>
      </div>
  
);
}