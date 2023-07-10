import React, { useContext, useRef, useState } from 'react'
import noteContext from './context/notes/noteContext';
import { useNavigate } from 'react-router-dom';

function Modal() {

    const context = useContext(noteContext);
    const [delConfirmationPass, setDelCode] = useState('');
    const DelConfirmCloseButton = useRef();
    const DelConfirmSubmitButton = useRef();
    const delConfirmationPassContiner = useRef();
    const host = 'http://localhost:5000/api';
    const navigate = useNavigate();

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

    const ChangeDelPass = (event) => {
        setDelCode(event.target.value);
    }

    return (
        <>

            {/* ********************* MODAL # 3 :Confirmation for deleting the user ********************** */}

            {/* ********************* MODAL # 2 :Confirmation for deleting the user ********************** */}

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
                                        <input type="checkbox" className="form-check-input" id="DelConfirm" required  />
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
