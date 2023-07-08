import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/noteContext';

function Login() {

    const context = useContext(noteContext);
    let navigate = useNavigate();
    const host = 'http://localhost:5000/api';
    const [Values, setValues] = useState({ email: '', password: '' })
    const onChange = (e) => {
        setValues({ ...Values, [e.target.name]: e.target.value });
    }
    /// fetching and checking the user
    const CheckUser = async (e) => {
        e.preventDefault();
        const req = await fetch(`${host}/auth/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: Values.email, password: Values.password })
        })
        const response = await req.json();

        if (response.success) {
            localStorage.setItem('auth-token', response.authToken);
            context.ShowAlert('Login successful , Kindly wait for a moment', 'success');
            setTimeout(() => {
                navigate('/');
            }, 2500);
        } else {
            context.ShowAlert(response.error, 'danger');
        }

    }

    return (

        <div className='container my-2'>
            <h4>Please Login to <code style={{ fontSize: 'xx-large' }}>iNoteBook</code></h4>
            <form onSubmit={CheckUser}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={Values.email} onChange={onChange} aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={Values.password} onChange={onChange} />
                </div>

                <button type="submit" className="btn btn-dark">Submit</button>
            </form>
        </div>
    )
}

export default Login
