import React from 'react'
import { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

function AddNotes() {

  const context = useContext(noteContext);
  const { addNote, ShowAlert } = context;
  const tmepNote = { title: '', description: '', comments: 'Default comment' }
  const [currentNote, setCurrentNote] = useState(tmepNote);

  const SubmitIt = (event) => {
    event.preventDefault();
    addNote(currentNote.title, currentNote.description, currentNote.comments);
    ShowAlert('A note has been added', 'success');
    document.getElementById('title').value = '';
    document.getElementById('comments').value = '';
    document.getElementById('description').value = '';
    setCurrentNote(tmepNote);
  }

  const onChange = (e) => {
    setCurrentNote({ ...currentNote, [e.target.name]: e.target.value });
  }

  return (
    <div className='my-2'>
      <h3>Add a new note :</h3>
      <form className='my-2'>
        <div className="mb-3">
          <label htmlFor="title" className="form-label"><h6>Enter Title :</h6></label>
          <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange} placeholder='Select an attractive title' />
        </div>
        <div className="mb-3">
          <label htmlFor="comments" className="form-label"><h6>Enter Comment :</h6></label>
          <input type="text" className="form-control" id="comments" name="comments" onChange={onChange} placeholder='Some words for your note'/>
        </div>
        <label htmlFor="description" className="form-label"><h6>Enter Description :</h6></label>
        <textarea className="form-control" id="description"  name="description" rows="8" onChange={onChange} placeholder='Desciption of your note'></textarea>


        <button disabled={currentNote.title.length <=3 || currentNote.description.length <=5} type="submit" className="btn btn-dark my-2" onClick={SubmitIt}>Add Note</button>
      </form>
    </div>
  )
}
export default AddNotes;
