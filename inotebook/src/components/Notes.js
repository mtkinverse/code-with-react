import React, { useEffect, useRef } from 'react';
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import NotesContent from './NotesContent';
import { useNavigate } from 'react-router-dom';


function Notes() {

    const ref = useRef(null);
    const navigate = useNavigate();
    const context = useContext(noteContext);
    const { notes, getNotes } = context;
  

    useEffect(() => {
        async function SeekData() {
            await context.GetUser();
            getNotes();
        }

        if (localStorage.getItem('auth-token')) {
            SeekData();
        }
        else {
            navigate('/login');
        }

        // eslint-disable-next-line
    }, []);

    const LetNoteEdit = (Newnote) => {
        context.setCurrentNote({ titleEdit: Newnote.title, descriptionEdit: Newnote.description, commentsEdit: Newnote.comments, id: Newnote._id });
        ref.current.click();
    }

    return (

        <>

            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#notes-editor" ref={ref} ></button>

          

            <div className={`container my-2 ${notes.length ? 'd-none' : ''}`}>
                <h5>No note to be displayed !</h5>
            </div>

            <div className='row my-3'>{notes.map((element) => {
                return <NotesContent key={element._id} note={element} UpdateNote={LetNoteEdit} />
            })
            }

            </div>
        </>
    )
}

export default Notes
