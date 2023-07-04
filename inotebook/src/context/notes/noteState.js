import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = ({children})=>{
    const state1 = {
        "name":"Taha",
        "designation":"Legend"
    }
    
    const [state,setState] = useState(state1);
    
    const Update =(newState)=> {
        setState({name:newState.name,designation:newState.designation});
    }
    
    return(
    <NoteContext.Provider value = {{state,Update}}>
        {children}
    </NoteContext.Provider>
    )
}

export default NoteState;
