import React, { useContext, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import { useNavigate } from 'react-router-dom';

function Modal() {

    const context = useContext(noteContext);
    const [delConfirmationPass, setDelCode] = useState('');
    const DelConfirmCloseButton = useRef();
    const DelConfirmSubmitButton = useRef();
    const delConfirmationPassContiner = useRef();
    const host = 'http://localhost:5000/api';
    const navigate = useNavigate();
    const [TempPass, setTempPass] = useState({ oldpassword: '', newpassword: '' })
    const CloseButton = useRef()
    const oldPassContainer = useRef();
    const newPassContainer = useRef();
    const NotesEditorCloseButton = useRef(null);
    
    const {currentNote,setCurrentNote} = context;

    const LogOut = () => {

        localStorage.removeItem('auth-token');
        navigate('/login');

    }

    const DeleteUser = async (e) => {
        e.preventDefault();
        if (! await context.delteAllNotes()) { return; }
        DelConfirmCloseButton.current.click();
        const req = await fetch(`${host}/auth/deleteUser`, {
            method: "DELETE",
            headers: {
                "auth-token": localStorage.getItem('auth-token'),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ password: delConfirmationPass })
        })
        const res = await req.json();

        if (res.success) {
            context.ShowAlert('Closing of Account confirmed , please wait for a moment', 'success');
            delConfirmationPassContiner.current.value = '';
            setDelCode('');
            setTimeout(() => {
                LogOut();
            }, 2500);
        } else {
            context.ShowAlert(res.error, 'danger');
        }
    }

    const changeTempOne = (e) => { // another type of onChange
        setTempPass({ ...TempPass, [e.target.name]: e.target.value })
    }

    const UpdateUser = async () => {

        const { name, email, id } = context.UserData;

        const req = await fetch(`${host}/auth/updateUser/${id}`, {
            method: 'PUT',
            headers: {
                "auth-token": localStorage.getItem('auth-token'),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, oldpassword: TempPass.oldpassword, newpassword: TempPass.newpassword ? TempPass.newpassword : TempPass.oldpassword })
        })
        const res = await req.json();
        if (res.success) {
            setTempPass({ oldpassword: '', newpassword: '' })
            oldPassContainer.current.value = ''
            newPassContainer.current.value = '';
            CloseButton.current.click();
            context.ShowAlert('Iformation Updated ! ', 'success');
        } else {
            CloseButton.current.click();
            context.ShowAlert(res.error, 'danger');
        }

    }


    const ChangeDelPass = (event) => {
        setDelCode(event.target.value);
    }

    onchange = (e) => {
        context.setUserData({ ...context.UserData, [e.target.name]: e.target.value })
    }

    const onChange = (e) => {
        setCurrentNote({ ...currentNote, [e.target.name]: e.target.value });
    }

    const EditNotes = () => {
        context.updateNote(currentNote.titleEdit, currentNote.descriptionEdit, currentNote.commentsEdit, currentNote.id);
        NotesEditorCloseButton.current.click();
    }

    return (
        <>

            {/* ********************* MODAL # 1 :For updating the notes ********************** */}

            <div className="modal fade" id="notes-editor" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                <textarea className="form-control" id="descriptionEdit" name="descriptionEdit" rows="8" onChange={onChange} placeholder='Desciption of your note' value={currentNote.descriptionEdit}></textarea>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref={NotesEditorCloseButton} data-bs-dismiss="modal">Close</button>
                            <button disabled={currentNote.titleEdit.length <= 3 || currentNote.descriptionEdit.length <= 5} type="button" className="btn btn-primary" onClick={EditNotes}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ********************* MODAL # 2 :Updating the user account  ********************** */}

            <div className="modal fade" id="UserInfo" tabIndex="-1" aria-labelledby="UserInfoLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="UserInfoLabel">User Info</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            {/* Modal Body started */}
                            <form >
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name : </label>
                                    <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" value={context.UserData.name} onChange={onchange} required />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address : </label>
                                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={context.UserData.email} onChange={onchange} required />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="oldpassword" className="form-label">Current Password : </label>
                                    <input type="password" ref={oldPassContainer} className="form-control" id="oldpassword" name="oldpassword" onChange={changeTempOne} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="newpassword" className="form-label">New Password (if you want to change) : </label>
                                    <input type="password" ref={newPassContainer} className="form-control" id="newpassword" name="newpassword" onChange={changeTempOne} />
                                </div>

                            </form>
                            {/* Modal Body ended */}

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={CloseButton}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={UpdateUser}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ********************* MODAL # 3 :Confirmation for deleting the user ********************** */}

            <div className="modal fade" id="DelAccountConfirmation" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="DelAccountConfirmationLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="DelAccountConfirmationLabel">Delete Account</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <form onSubmit={DeleteUser}>

                                <div className="mb-3">
                                    <label htmlFor="delConfirmationPass" className="form-label">Enter Password</label>
                                    <input type="password" className="form-control" id="delConfirmationPass" name="delConfirmationPass" ref={delConfirmationPassContiner} onChange={ChangeDelPass} minLength={4} required />
                                    <p>Your account will be deleted along with all the notes and cannot be restored</p>
                                    <div className="my-2 form-check">
                                        <input type="checkbox" className="form-check-input" id="DelConfirm" required />
                                        <label className="form-check-label" htmlFor="DelConfirm">Delte My Account</label>
                                    </div>
                                </div>
                                <button type='submit' className='d-none' ref={DelConfirmSubmitButton}></button>
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={DelConfirmCloseButton}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => { DelConfirmSubmitButton.current.click() }}>Delte Account</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal
