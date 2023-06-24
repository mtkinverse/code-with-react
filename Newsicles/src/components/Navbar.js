import React, { Component } from 'react'
import { Link } from 'react-router-dom';
export class Navbar extends Component {
  render() {
    
    return (

      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to='/'>
            <img src={process.env.PUBLIC_URL + '/logo192.png'} alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
            Accurate News
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to='/'>Home</Link>
              </li>

              <li className='nav-item'>
                <div className="dropdown">
                  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Specify Category
                  </button>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item"  to="/business">Business</Link></li>
                    <li><Link className="dropdown-item" to="/general">General</Link></li>
                    <li><Link className="dropdown-item" to="/entertainment">Entertainment</Link></li>
                    <li><Link className="dropdown-item" to="/health">Health</Link></li>
                    <li><Link className="dropdown-item" to="/sports">Sports</Link></li>
                    <li><Link className="dropdown-item" to="/technology">Technology</Link></li>
                  </ul>
                </div>
              </li>

            </ul>

          </div>
        </div>
      </nav>

    )
  }
}

export default Navbar
