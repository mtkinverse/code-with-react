import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = ({ children }) => {

  const host = 'http://localhost:5000/api';
  const [notes, setNotes] = useState([]);
  const [AlertContent, AlertIt] = useState({});
  const [UserData, setUserData] = useState({ name: '', date: '', email: '', id: '' });
  const [currentNote, setCurrentNote] = useState({ titleEdit: '', descriptionEdit: '', commentsEdit: '', id: '' });

  const ShowAlert = (message, type) => {
    AlertIt({ message, type });

    setTimeout(() => {
      AlertIt(null);
    }, 2500);
  }

  const PrintDate = (DateInMs) => {
    // return date.getDay();  
    const date = new Date(parseInt(DateInMs));
    const format = { day: '2-digit', month: '2-digit', year: '2-digit' };
    return date.toLocaleDateString(undefined, format);
    // 
  }

  const GetUser = async () => {
    const req = await fetch(`${host}/auth/seekUser`, {
      method: 'POST',
      headers: {
        'auth-token': localStorage.getItem('auth-token')
      }
    })
    const res = await req.json();
    setUserData({ name: res.name, date: res.date, email: res.email, id: res._id });

  }

  const getNotes = async () => {
    const response = await fetch(`${host}/notes/fetchall`, {
      method: 'GET',
      headers: {
        "auth-token": localStorage.getItem('auth-token'),
        "Content-Type": "application/json"

      }
    })
    const data = await response.json();
    setNotes(data);
    if (data.length > 0)
      ShowAlert('All the notes uploaded !', 'success');
  }

  const addNote = async (title, description, comments) => {
    //Adding in the data base
    const response = await fetch(`${host}/notes/addnewnote`, {
      method: 'POST',
      headers: {
        "auth-token": localStorage.getItem('auth-token'),
        "Content-Type": "application/json"

      },
      body: JSON.stringify({ title, description, comments: comments.length > 0 ? comments : null })
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
        "auth-token": localStorage.getItem('auth-token'),
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

        "auth-token": localStorage.getItem('auth-token'),
        "Content-Type": "application/json"

      }
    })
    const data = await response.json();
    const newnotes = notes.filter((element) => { return element._id !== id });
    setNotes(newnotes);
    ShowAlert(`A note with title "${data.note.title}" has been deleted`, 'danger');

  }

  const delteAllNotes = async () => {
    const req = await fetch(`${host}/notes/deleteAllNotes`, {
      method: 'DELETE',
      headers: {
        "auth-token": localStorage.getItem('auth-token')
      }
    })
    const res = await req.json();

    if (res.success) {
      ShowAlert(res.message, 'success');
      return true;
    } else {
      ShowAlert(res.error, 'danger');
      return false;
    }
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, AlertContent, ShowAlert, getNotes, updateNote, delteAllNotes, setUserData, GetUser, UserData, PrintDate,currentNote,setCurrentNote }}>
      {children}
    </NoteContext.Provider>
  )
}

export default NoteState;
