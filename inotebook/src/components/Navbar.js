import React, { useContext, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/noteContext';
import Modal from './Modal';

function Navbar() {


  const Location = useLocation();
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const OpenButton = useRef();
  const DelAccountConfirmationButton = useRef();


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
                    <li className='dropdown-item' style={{ cursor: 'pointer' }} onClick={() => { OpenButton.current.click() }}><b>Edit Account Info</b></li>
                    <li className='dropdown-item' style={{ cursor: 'pointer' }} onClick={() => { DelAccountConfirmationButton.current.click(); }}><b>Delete Account</b></li>
                  </ul>
                </div>
                <button className='btn btn-sm btn-light mx-1' onClick={LogOut}>Logout</button>
              </>
            }

          </div>
        </div>
      </nav>
      {/* ----------------------A new modal button for updating the user imfo ----------------------------- */}

      <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#UserInfo" ref={OpenButton}>
      </button>


      {/* ---------------------- A new Modal button for deleting the user account ---------------------- */}

      <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#DelAccountConfirmation" ref={DelAccountConfirmationButton}>
      </button>
      <Modal />
    </>
  )
}

export default Navbar
