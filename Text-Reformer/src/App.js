
import './App.css';
import Navbar from './Components/Navbar';
import Form from './Components/Form';
import React,{useState} from 'react';
import Alert from './Components/Alert';
import NoPage from './Components/NoPage';
import About from './Components/About';

import { Routes, Route } from "react-router-dom";

function App() {

  const[alert,alertIt] = useState(null);
  const [Mode,setMode] = useState("Light Mode");
  const [fordismissal,ChangeStat] = useState(false);

  const [DarkLight,setStyle] = useState({
    backgroundColor : 'white',
    color : 'black'
  })

  const showAlert = (message,type)=>{
    ChangeStat(true);
    alertIt({
      alertMsg : message,alertType : type 
    })
  
    setTimeout(() => {
      alertIt(null);
      ChangeStat(false);    
  }, 1500);

  }
  

  const ChangeMode = ()=>{
 
    if(DarkLight.color ==='white' ){
  setStyle({
    backgroundColor : 'white',color:'black'
  })  
  setMode("Light Mode");
  document.body.style.backgroundColor = 'white'
  showAlert('Light Mode Enabled ! ','success');
  
}
else{
setStyle({
  backgroundColor : 'black',color:'white'
})  
setMode("Dark Mode");
document.body.style.backgroundColor = 'rgb(64 78 117)';
showAlert('Dark Mode Enabled ! ','success');

}
  }


  return (
    <>
    <Navbar Title = "Text-Reformer" ImgLink={process.env.PUBLIC_URL + '/logo192.png'} ChangeMode={ChangeMode} Mode = {Mode} DarkLight = {DarkLight} setStyle = {setStyle}/>
    <Alert alert={alert} />
    
      <Routes>
        <Route index element={<Form DarkLight = {DarkLight} showAlert = {showAlert} fordismissal = {fordismissal} ChangeStat={ChangeStat}/>} />
        <Route path='/about' element={<About creator="Muhammad Taha Khan" creatingDate = "June 2023" DarkLight={DarkLight}/>} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    
    </>

  );
}

export default App;


