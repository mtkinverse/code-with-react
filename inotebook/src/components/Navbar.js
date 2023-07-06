import React from 'react'
import { Link ,useLocation} from 'react-router-dom'

function Navbar() {
    const Location=useLocation();
  return (
    <nav className="navbar bg-dark navbar-expand-lg bg-body-tertiary " data-bs-theme = 'dark'>
  <div className="container-fluid">
    <img className='navbar-brand rounded-circle' src={process.env.PUBLIC_URL+'favicon-32x32.png'} alt=''/>
    <Link className="navbar-brand" to="/">iNoteBook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${Location.pathname === '/' ? 'active':''}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${Location.pathname === '/about' ? 'active':''}`} to="/about">About</Link>
        </li>
        </ul>
        
    </div>
  </div>
</nav>
  )
}

export default Navbar
