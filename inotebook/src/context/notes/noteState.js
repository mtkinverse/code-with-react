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
    setNotes(data);
    ShowAlert('All the notes uploaded !', 'success');
  }

  const addNote = async (title, description, comments) => {
    //Adding in the data base
    const response = await fetch(`${host}/notes/addnewnote`, {
      method: 'POST',
      headers: {
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5ZGNlODM5M2RlZGMzYjFlNTViZjA4In0sImlhdCI6MTY4ODEyMzkwNX0.LV07pnYretFmPwczmhDDoNavyQG_KJJWvtkzKrdWNFw",
        "Content-Type": "application/json"

      },
      body: JSON.stringify({ title, description, comments })
    })

    // Ading on client side

    const AddedNote = await response.json();
    setNotes(notes.concat(AddedNote.savedNote));


    ShowAlert('A new note added successfully !', 'success');

  }

  const updateNote = async (title, description, comments, id) => {
    await fetch(`${host}/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5ZGNlODM5M2RlZGMzYjFlNTViZjA4In0sImlhdCI6MTY4ODEyMzkwNX0.LV07pnYretFmPwczmhDDoNavyQG_KJJWvtkzKrdWNFw",
        "Content-Type": "application/json"

      },
      body: JSON.stringify({ title, description, comments })
    });

    for (let i = 0; i < notes.length; i++) {
      if (notes[i]._id === id) {
        notes[i].title = title;
        notes[i].description = description;
        notes[i].comments = comments;
      }
      ShowAlert('Successfully Updated', 'success');
    }
  }

  const deleteNote = async (id) => {
    //Deleting from backend
    const response = await fetch(`${host}/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {

        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5ZGNlODM5M2RlZGMzYjFlNTViZjA4In0sImlhdCI6MTY4ODEyMzkwNX0.LV07pnYretFmPwczmhDDoNavyQG_KJJWvtkzKrdWNFw",
        "Content-Type": "application/json"

      }
    })
    const data = await response.json();
    const newnotes = notes.filter((element) => { return element._id !== id });
    setNotes(newnotes);
    ShowAlert(`A note with title ${data.note.title} has been deleted`, 'danger');

  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, AlertContent, ShowAlert, getNotes, updateNote }}>
      {children}
    </NoteContext.Provider>
  )
}

export default NoteState;
