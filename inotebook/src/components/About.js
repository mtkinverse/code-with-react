import React,{useContext} from 'react';
import noteContext from '../context/notes/noteContext';

function About() {

    const a = useContext(noteContext);
    return (
        <div>
        {console.log(a)}
      You are in  the about component
      This was created by {a.state.name} the {a.state.designation}
      <button type='button' onClick={()=>{a.Update({name : 'Ali',designation:'Haari'})}}>Click Here</button>
    </div>
  )
}

export default About
