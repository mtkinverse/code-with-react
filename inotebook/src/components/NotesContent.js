import React from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

function NotesContent(props) {

    const context = useContext(noteContext);
    return (
        <>
           
            <div className='col-md-4 my-2'>
                <div className="card" >
                    <div className="card-body">
                        <h5 className="card-title">{props.note.title}</h5>
                        <h6 className="card-subtitle mb-2 text-body-secondary">{props.note.comments}</h6>
                        <hr />
                        <p className="card-text my-2">{props.note.description}</p>
                        <i className="fa-solid fa-trash-can mx-2" onClick={() => { context.deleteNote(props.note._id) }} ></i>
                        <i className="fa-solid fa-pen mx-2" onClick={()=>{props.UpdateNote(props.note)}}></i>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotesContent
