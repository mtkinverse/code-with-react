import React, { useEffect, useRef , useState } from 'react';
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import NotesContent from './NotesContent';

function Notes() {
    
    const ref = useRef(null);
    const CloseButton = useRef(null);
    const context = useContext(noteContext);
    const { notes, getNotes, updateNote } = context;
    const [currentNote, setCurrentNote] = useState({titleEdit:'',descriptionEdit : '',commentsEdit : '',id:''});

    useEffect(() => {
        getNotes();
        // eslint-disable-next-line
    }, []);

    const onChange = (e) => {
        setCurrentNote({ ...currentNote, [e.target.name]: e.target.value });
    }

    const EditNotes = ()=>{
        updateNote(currentNote.titleEdit,currentNote.descriptionEdit,currentNote.commentsEdit,currentNote.id);
        CloseButton.current.click();
    }

    const LetNoteEdit = (Newnote)=>{
        setCurrentNote({titleEdit:Newnote.title,descriptionEdit:Newnote.description,commentsEdit:Newnote.comments,id:Newnote._id});
        ref.current.click();
    }

    return (

        <>

            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref} ></button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Your Note Here</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-2'>
                                <div className="mb-3">
                                    <label htmlFor="titleEdit" className="form-label"><h6>Enter Title :</h6></label>
                                    <input type="text" className="form-control" id="titleEdit" name='titleEdit' aria-describedby="emailHelp" value={currentNote.titleEdit} onChange={onChange} placeholder='Select an attractive title' />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="commentsEdit" className="form-label"><h6>Enter Comment :</h6></label>
                                    <input type="text" className="form-control" id="commentsEdit" name="commentsEdit" onChange={onChange} value={currentNote.commentsEdit} placeholder='Some words for your note' />
                                </div>
                                <label htmlFor="descriptionEdit" className="form-label"><h6>Enter Description :</h6></label>
                                <textarea className="form-control" id="descriptionEdit"  name="descriptionEdit" rows="8" onChange={onChange} placeholder='Desciption of your note' value={currentNote.descriptionEdit}></textarea>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref={CloseButton} data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={EditNotes}>Save changes</button>
                        </div>
                    </div>
                </div>
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
