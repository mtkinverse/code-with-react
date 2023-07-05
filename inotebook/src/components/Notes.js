import React, { useEffect } from 'react';
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import NotesContent from './NotesContent';

function Notes() {
    const context = useContext(noteContext);
    const { notes,getNotes } = context;
    
    useEffect(()=>{
        getNotes();
        // eslint-disable-next-line
    },[]);

    return (
        <div className='row my-3'>{notes.map((element) => {
            return <NotesContent key={element._id} note={element} />
        })
        }

        </div>
    )
}

export default Notes
