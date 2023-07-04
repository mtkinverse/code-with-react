import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = ({children})=>{

    const InitialNotes = [
        {
          "_id": "64a19e7057f0f3e60257302a",
          "user": "649dce8393dedc3b1e55bf08",
          "title": "First Note",
          "description": "This is the first note to be stored",
          "comments": "First Note",
          "date": "1688313456771",
          "__v": 0
        },
        {
          "_id": "64a1c3f601e4dc1e675f0050",
          "user": "649dce8393dedc3b1e55bf08",
          "title": "Another Note",
          "description": "This is a new note to be stored without comment to check whether the default comment is appendng or not",
          "comments": "Add a comment to your note",
          "date": "1688323062371",
          "__v": 0
        },
        {
          "_id": "64a1c45501e4dc1e675f0052",
          "user": "649dce8393dedc3b1e55bf08",
          "title": "Update Description note",
          "description": "A new note added without comment , but would be updated to set the description",
          "comments": "The one which did'nt have comment ",
          "date": "1688323157264",
          "__v": 0
        },{
          "_id": "64a19e7057f0f3e60257302a1",
          "user": "649dce8393dedc3b1e55bf08",
          "title": "First Note",
          "description": "This is the first note to be stored",
          "comments": "First Note",
          "date": "1688313456771",
          "__v": 0
        },
        {
          "_id": "64a1c3f601e4dc1e675f00502",
          "user": "649dce8393dedc3b1e55bf08",
          "title": "Another Note",
          "description": "This is a new note to be stored without comment to check whether the default comment is appendng or not",
          "comments": "Add a comment to your note",
          "date": "1688323062371",
          "__v": 0
        },
        {
          "_id": "64a1c45501e4dc1e675f00523",
          "user": "649dce8393dedc3b1e55bf08",
          "title": "Update Description note",
          "description": "A new note added without comment , but would be updated to set the description",
          "comments": "The one which did'nt have comment ",
          "date": "1688323157264",
          "__v": 0
        }
      ]
      const [notes,setNotes] = useState(InitialNotes);
    
      const addNote = (title,description,comments)=>{
        console.log("Adding new note")
        const newnote= {
          "_id": "64a19e7057f0f3e60257302a",
          "user": "649dce8393dedc3b1e55bf08",
          "title": title,
          "description": description,
          "comments": comments,
          "date": "1688313456771",
          "__v": 0
        }
       setNotes(notes.concat(newnote));
      }

    return(
    <NoteContext.Provider value = {{notes,addNote}}>
        {children}
    </NoteContext.Provider>
    )
}

export default NoteState;