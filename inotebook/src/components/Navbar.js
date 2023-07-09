import React, { useContext, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/noteContext';

function Navbar() {


  const Location = useLocation();
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const host = 'http://localhost:5000/api';
  const [TempPass, setTempPass] = useState({ oldpassword: '', newpassword: '' })
  const OpenButton = useRef();
  const CloseButton = useRef()
  const oldPassContainer = useRef();
  const newPassContainer = useRef();


  onchange = (e) => {
    context.setUserData({ ...context.UserData, [e.target.name]: e.target.value })
  }

  const changeTempOne = (e)=>{ // another type of onChange
    setTempPass({...TempPass,[e.target.name]:e.target.value})
  }

  const UpdateUser = async () => {

    const { name, email, id} = context.UserData;

    const req = await fetch(`${host}/auth/updateUser/${id}`, {
      method: 'PUT',
      headers: {
        "auth-token": localStorage.getItem('auth-token'),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, oldpassword : TempPass.oldpassword, newpassword : TempPass.newpassword ? TempPass.newpassword : TempPass.oldpassword})
    })
    const res = await req.json();
    if (res.success) {
      setTempPass({oldpassword:'',newpassword:''})
      oldPassContainer.current.value=''
      newPassContainer.current.value='';
      CloseButton.current.click();
      context.ShowAlert('Iformation Updated ! ', 'success');
    }else{
      context.ShowAlert(res.error,'danger');
    }

  }

  const LogOut = () => {

    localStorage.removeItem('auth-token');
    navigate('/login');

  }
  return (
    <>
      <nav className="navbar bg-dark navbar-expand-lg bg-body-tertiary " data-bs-theme='dark'>
        <div className="container-fluid">
          <img className='navbar-brand rounded-circle' src={process.env.PUBLIC_URL + 'favicon-32x32.png'} alt='' />
          <Link className="navbar-brand" to="/">iNoteBook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${Location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${Location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
              </li>
            </ul>
            {!localStorage.getItem('auth-token') ?

              <form className='d-flex'>
                <Link className='btn btn-sm btn-light mx-1' to='/login'>Login</Link>
                <Link className='btn btn-sm btn-light mx-1' to='/signup'>Signup</Link>
              </form>
              :
              <>
                <div className="dropstart mx-1">
                  <button className="btn btn-sm btn-dark dropdown-toggle rounded-circle " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={process.env.PUBLIC_URL + 'account.png'} className='rounded-circle' alt='User' ></img>
                  </button>
                  <ul className="dropdown-menu">
                    <li className='dropdown-item'>{context.UserData.name}</li>
                    <li className='dropdown-item'>{context.UserData.email}</li>
                    <li className='dropdown-item'>Created on : {context.PrintDate(context.UserData.date)}</li>
                    <li className='dropdown-item'><hr /></li>
                    <li className='dropdown-item' style={{ cursor: 'pointer' }} onClick={()=>{OpenButton.current.click()}}><b>Edit Account Info</b></li>
                  </ul>
                </div>
                <button className='btn btn-sm btn-light mx-1' onClick={LogOut}>Logout</button>
              </>
            }

          </div>
        </div>
      </nav>
      {/* ---------------------------------------------------------------------------------------------------------- */}

      <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={OpenButton}>
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              {/* Modal Body started */}
              <form >
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name : </label>
                  <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" value={context.UserData.name} onChange={onchange} required />

                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address : </label>
                  <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={context.UserData.email} onChange={onchange} required />

                </div>
                <div className="mb-3">
                  <label htmlFor="oldpassword" className="form-label">Current Password : </label>
                  <input type="password" ref={oldPassContainer} className="form-control" id="oldpassword" name="oldpassword" onChange={changeTempOne} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="newpassword" className="form-label">New Password (if you want to change) : </label>
                  <input type="password" ref={newPassContainer} className="form-control" id="newpassword" name="newpassword" onChange={changeTempOne} />
                </div>

              </form>
              {/* Modal Body ended */}

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={CloseButton}>Close</button>
              <button type="button" className="btn btn-primary" onClick={UpdateUser}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
