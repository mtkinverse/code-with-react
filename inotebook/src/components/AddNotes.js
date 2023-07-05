import React from 'react'
import { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

function AddNotes() {

  const context = useContext(noteContext);
  const { addNote , ShowAlert } = context;
  const tmepNote = { title: '', description: '', comments: 'Default comment' }
  const [currentNote, setCurrentNote] = useState(tmepNote);

  const SubmitIt = (event) => {
    event.preventDefault();
    addNote(currentNote.title, currentNote.description, currentNote.comments);
    ShowAlert('Notes has been added' , 'success');
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
  }

  const onChange = (e) => {
    setCurrentNote({ ...currentNote, [e.target.name]: e.target.value });
  }
  return (
    <div className='my-2'>
      <h3>Add a new note :</h3>
      <form className='my-2'>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Enter Title :</label>
          <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Enter Description :</label>
          <input type="text" className="form-control" id="description" name="description" onChange={onChange} />
        </div>

        <button type="submit" className="btn btn-primary" onClick={SubmitIt}>Add Note</button>
      </form>
    </div>
  )
}
export default AddNotes;
