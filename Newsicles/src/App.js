import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import { Routes, Route } from "react-router-dom";

export class App extends Component {

  render() {

    return (
      <>
        <Navbar />
        <Routes>
          <Route index element = {<News key='general' country = 'us' category='general' MainTitle='Top Headlines : General in USA' pageSize = '20'/>}/>
          <Route path='/business' element = {<News key='business' country = 'us' category='business' MainTitle='Top Headlines :  Business in USA' pageSize = '20'/>}/>
          <Route path='/entertainment' element = {<News key='entertainment' country = 'us' category='entertainment' MainTitle='Top Entertainment :  in USA' pageSize = '20'/>}/>
          <Route path='/health' element = {<News key='health' country = 'us' category='health' MainTitle='Top Headlines : Health in USA' pageSize = '20'/>}/>
          <Route path='/science' element = {<News key='science' country = 'us' category='science' MainTitle='Top Headlines : Science in USA' pageSize = '20'/>}/>
          <Route path='/sports' element = {<News key='sports' country = 'us' category='sports' MainTitle='Top Headlines : Sports in USA' pageSize = '20'/>}/>
          <Route path='/technology' element = {<News key='technology' country = 'us' category='technology' MainTitle='Top Headlines : Technology in USA' pageSize = '20'/>}/>
        </Routes>
      </>
    )
  }
}

export default App
