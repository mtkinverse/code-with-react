import React , {useState} from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import { Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = () => {
  const [progress,setProgress] = useState(0);
const apiKey = process.env.REACT_APP_API_KEY;
//process.env.REACT_APP_API_KEY;//Note this has become an environment variable , by declaring it in process.env and also starting the name with REACT_APP this is similar to the process.env.PUBLIC_URL we used note we have to rebuild the server to recreate the enviromemt and to add the included variables in env.local, in environment
const [country , setCountry] = useState('us');
    return (
      <>
      <div style={{marginTop:'100px'}}>
        <Navbar setCountry = {setCountry}  country = {country}/>
        <LoadingBar height={4} color='red' progress={progress}/>
        </div>
        <Routes>
          <Route index element = {<News key='general' country = {country} apiKey = {apiKey} category='general' MainTitle='Top Headlines : General in ' pageSize = '20' setProgress={setProgress} />}/>
          <Route path='/business' element = {<News key='business' country = {country} apiKey = {apiKey} category='business' MainTitle='Top Headlines :  Business in ' pageSize = '20' setProgress={setProgress} />}/>
          <Route path='/entertainment' element = {<News key='entertainment' country = {country} apiKey = {apiKey} category='entertainment' MainTitle='Top Entertainment :  in ' pageSize = '20' setProgress={setProgress} />}/>
          <Route path='/health' element = {<News key='health' country = {country} apiKey = {apiKey} category='health' MainTitle='Top Headlines : Health in ' pageSize = '20' setProgress={setProgress} />}/>
          <Route path='/science' element = {<News key='science' country = {country} apiKey = {apiKey} category='science' MainTitle='Top Headlines : Science in ' pageSize = '20' setProgress={setProgress} />}/>
          <Route path='/sports' element = {<News key='sports' country = {country} apiKey = {apiKey} category='sports' MainTitle='Top Headlines : Sports in ' pageSize = '20' setProgress={setProgress} />}/>
          <Route path='/technology' element = {<News key='technology' country = {country} apiKey = {apiKey} category='technology' MainTitle='Top Headlines : Technology in ' pageSize = '20' setProgress={setProgress} />}/>
        </Routes>
      </>
    )
  
}

export default App
