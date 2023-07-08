import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/noteContext';

function Signup() {

  const context = useContext(noteContext);
  let navigate = useNavigate();
  const host = 'http://localhost:5000/api';
  const [Values, setValues] = useState({ name: '', email: '', password: '', passwordConfirm: '' })
  const onChange = (e) => {
    setValues({ ...Values, [e.target.name]: e.target.value });
  }

  const CreateUser = async (e) => {
    e.preventDefault();
    if (Values.password !== Values.passwordConfirm) {
      context.ShowAlert('Your password did not match try again', 'danger');
    } else {
      const req = await fetch(`${host}/auth/createUser`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: Values.name, email: Values.email, password: Values.password })
      });
      const res = await req.json();
      // Redirect if success
      if (res.success) {
        localStorage.setItem('auth-token', res.authToken);
        context.ShowAlert('Signup Successful , Kindly wait for a moment', 'success');
        setTimeout(() => {
          navigate('/');
        }, 2500);
      } else {
        context.ShowAlert(res.error, 'danger');
      }
    }
  }

  return (
    <div className='container my-2'>
      <h4>Please Signup to <code style={{ fontSize: 'xx-large' }}>iNoteBook</code></h4>
      <form onSubmit={CreateUser}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name :</label>
          <input type="text" className="form-control" id="name" onChange={onChange} name="name" aria-describedby="emailHelp" minLength={4} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" onChange={onChange} name='email' aria-describedby="emailHelp" required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label" >Password</label>
          <input type="password" className="form-control" id="password" onChange={onChange} name='password' minLength={4} required />
        </div>
        <div className="mb-3">
          <label htmlFor="passwordConfirm" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="passwordConfirm" onChange={onChange} name="passwordConfirm" minLength={4} required />
        </div>
        <button type="submit" className="btn btn-dark">Submit</button>
      </form>
    </div>
  )
}

export default Signup
