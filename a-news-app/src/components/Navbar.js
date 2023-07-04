import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = (props)=>{

      const UpdateCountry = (value) => {
        props.setCountry(value);
      }

    return (

      <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to='/'>
            <img src={process.env.PUBLIC_URL + '/logo192.png'} alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
            Newsicles
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
                <div className="dropdown mx-2">
                  <button className="btn btn-secondary dropdown-toggle btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Specify Category
                  </button>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item"  to="/business">Business</Link></li>
                    <li><Link className="dropdown-item" to="/entertainment">Entertainment</Link></li>
                    <li><Link className="dropdown-item" to="/health">Health</Link></li>
                    <li><Link className="dropdown-item" to="/sports">Sports</Link></li>
                    <li><Link className="dropdown-item" to="/technology">Technology</Link></li>
                  </ul>
                </div>
              </li>

              <li className='nav-item'>
                <div className="dropdown mx-2">
                  <button className="btn btn-secondary dropdown-toggle btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Search another country
                  </button>
                  <ul className="dropdown-menu">
                    <li > <Link  to='/' > <button className='btn btn-sm' type='button' onClick={()=>{UpdateCountry('ar')}}> Argentina </button> </Link> </li>
                    <li > <Link  to='/' > <button className='btn btn-sm' type='button' onClick={()=>{UpdateCountry('au')}}> Australia </button> </Link> </li>
                    <li > <Link  to='/' > <button className='btn btn-sm' type='button' onClick={()=>{UpdateCountry('br')}}> Brazil </button> </Link> </li>
                    <li > <Link  to='/' > <button className='btn btn-sm' type='button' onClick={()=>{UpdateCountry('ca')}}> Canada </button> </Link> </li>
                    <li > <Link  to='/' > <button className='btn btn-sm' type='button' onClick={()=>{UpdateCountry('cn')}}> China </button> </Link> </li>
                    <li > <Link  to='/' > <button className='btn btn-sm' type='button' onClick={()=>{UpdateCountry('de')}}> Germany </button> </Link> </li>
                    <li > <Link  to='/' > <button className='btn btn-sm' type='button' onClick={()=>{UpdateCountry('fr')}}> France </button> </Link> </li>
                    <li > <Link  to='/' > <button className='btn btn-sm' type='button' onClick={()=>{UpdateCountry('gb')}}> United Kingdom </button> </Link> </li>
                    <li > <Link  to='/' > <button className='btn btn-sm' type='button' onClick={()=>{UpdateCountry('jp')}}> Japan </button> </Link> </li>
                    <li > <Link  to='/' > <button className='btn btn-sm' type='button' onClick={()=>{UpdateCountry('in')}}> India </button> </Link> </li>
            
                  </ul>
                </div>
              </li>

            </ul>

          </div>
        </div>
      </nav>
/*
'ar': Argentina
'au': Australia
: Brazil
: Canada
: China
: Germany
: France
: United Kingdom
: India
: Japan
: United States
 */
    )
  
}

export default Navbar
