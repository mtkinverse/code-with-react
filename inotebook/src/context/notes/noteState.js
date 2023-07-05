import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = ({ children }) => {

  const host = 'http://localhost:5000/api';
  const [notes, setNotes] = useState([]);
  const [AlertContent, AlertIt] = useState({});

  const ShowAlert = (message, type) => {
    AlertIt({ message, type });

    setTimeout(() => {
      AlertIt(null);
    }, 1500);
  }

  const getNotes = async () => {
    const response = await fetch(`${host}/notes/fetchall`, {
      method: 'GET',
      headers: {
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5ZGNlODM5M2RlZGMzYjFlNTViZjA4In0sImlhdCI6MTY4ODEyMzkwNX0.LV07pnYretFmPwczmhDDoNavyQG_KJJWvtkzKrdWNFw",
        "Content-Type": "application/json"

      }
    })
    const data = await response.json();
    console.log(data);
    setNotes(data);
    ShowAlert("All the notes uploaded",'success');
  }

  const addNote = (title, description, comments) => {
    const newnote = {
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

  const deleteNote = (id) => {
    const newnotes = notes.filter((element) => { return element._id !== id });
    setNotes(newnotes);
    ShowAlert('A note has been deleted', 'danger');
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, AlertContent, ShowAlert,getNotes }}>
      {children}
    </NoteContext.Provider>
  )
}

export default NoteState;
