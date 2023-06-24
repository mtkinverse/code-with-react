import React, { Component } from 'react'

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={process.env.PUBLIC_URL + '/__Iphone-spinner-1.gif'} alt= 'Loading Spinner'/>
      </div>
    )
  }
}

export default Spinner
