import React,{useState} from 'react'

export default function Form(receiver) {
  
  const [text,SetText] =useState("");  
  
  const ConvertUpperCase = ()=>{
    SetText(text.toUpperCase());
    receiver.showAlert('Converted to upper case','success')
  }
  
  const ConvertLowerCase = ()=>{
    SetText(text.toLowerCase());
    receiver.showAlert('Converted to lower case','success')
  } 
  
  const ClearText = ()=>{
    SetText("");
    receiver.showAlert('The text has been cleared !','danger')
  }

  const DefineOnChange = (event)=>{

    SetText(event.target.value);
    
    if((text.length>0)&& !((text.charCodeAt(text.length-1)>=65 && text.charCodeAt(text.length-1)<=90)||(text.charCodeAt(text.length-1)>=97 && text.charCodeAt(text.length-1)<=122) || text.charCodeAt(text.length-1)===32 || text.charAt(text.length-1)=== '-')){
      receiver.showAlert('Please re-enter a valid alphabet to be analyzed','danger');
      let newString = ['\0'];
      
      for(let i=0;i<text.length - 1 ;i++){
        newString[i]=text.charAt(i);
      }
      SetText(newString.join(''));
    }
    
    
  }
  
   

  return (
    <>
<div className="container my-3" style={{ backgroundColor : receiver.DarkLight.backgroundColor === 'white' ? 'white' : 'rgb(64 78 117)',color : receiver.DarkLight.backgroundColor === 'white' ? 'black':'white'}}>
  <label htmlFor="exampleFormControlTextarea1" className="form-label"><h1>Enter your text here</h1></label>
  <textarea className="form-control" id="exampleFormControlTextarea1" rows="8" value={text} onChange={DefineOnChange} placeholder='Enter your text here'></textarea>
  <div className='my-2 mx-2' >
  {text.split(" ").filter((arr)=>{return arr.length !== 0}).length} words are typed <br/> {text.length} characters are typed
  </div>
  <button disabled={text.length===0 ? true: receiver.fordismissal } type="button" className='btn btn-primary m-1' onClick={ConvertUpperCase} >Convert to uppercase</button>
  <button disabled={text.length===0 ? true: receiver.fordismissal } type="button" className='btn btn-primary m-1' onClick={ConvertLowerCase} >Convert to lowercase</button>
  <button disabled={text.length===0 ? true: receiver.fordismissal } type="button" className='btn btn-danger m-1' onClick={ClearText} >Clear Text</button>
  </div>  
  
</>
  )
}
