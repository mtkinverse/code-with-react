import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import actionCreators from '../state/index';

function AddValues() {

    let numbox = 1;
    const ItemValue = useRef();
    const ItemName = useRef();
    const [Items, setItems] = useState([]);

    const dispatch = useDispatch();

    const SubmitIt = (e, index) => {
        e.preventDefault();
        const obj = {
            name: ItemName.current.value,
            value: ItemValue.current.value
        }
        if (obj.value <= 0) {
            alert('Please enter a valid value ! ');
            return;
        }
        setItems([...Items].concat(obj));
        ItemName.current.value = '';
        ItemValue.current.value = null;
        dispatch(actionCreators.AddMoney(parseInt(obj.value)));
        CloseModal(e, index);
    }

    const OpenModal = (index) => {

        document.getElementById('Home').classList.add('blur-box')
        document.getElementById('AllValuesHolder').classList.add('blur-box')
        const reqModal = document.getElementById(`modal${index}`);
        reqModal.style.display = 'flex';
        reqModal.focus()

    }

    const CloseModal = (e, index) => {

        e.preventDefault();
        document.getElementById(`modal${index}`).style.display = 'none';
        document.getElementById('Home').classList.remove('blur-box')
        document.getElementById('AllValuesHolder').classList.remove('blur-box')
    }

    useEffect(() => {

    }, [Items.length])

    return (
        <>
            <div className='addValues' id='AllValuesHolder'>
                <div className='rightValues' id={`box${numbox}`}>
                    <div className='listHeader'>
                        <li >Names</li>
                        <li >Values</li>
                    </div>
                    {
                        Items.length > 0 ?
                            Items.map(
                                ele => {
                                    return <div className='listValues' key={ele.name} id={ele.name}>
                                        <li >{ele.name}</li>
                                        <li id='values'>{ele.value}</li>
                                    </div>
                                }
                            )
                            : <div className='listValues'><li><p>Kindly, Enter values</p></li></div>
                    }
                    <div className='listValues'>
                        <li><button id={`Addbtn${numbox}`} className='submitButton' onClick={() => { OpenModal(numbox) }}>Add Values</button></li>
                    </div>
                </div>

            </div>

            <div className='addValues'>
                <button className='submitButton'>Add new box</button>
            </div>
            
            <div className='modals'>
                <div className='InsertValues' key={`modal${numbox}`} id={`modal${numbox}`}>
                    <form onSubmit={(e) => { SubmitIt(e, numbox) }}>

                        <input type='text' placeholder='Enter name' name='name' ref={ItemName} required />
                        <input type='number' placeholder='Enter Value' name='value' ref={ItemValue} required />
                        <br />
                        <button className='submitButton' type='submit'>Add</button>
                        <button className='submitButton' onClick={(e) => { CloseModal(e, numbox) }}>Cancle</button>

                    </form>
                </div>
            </div>

        </>


    )
}

export default AddValues
