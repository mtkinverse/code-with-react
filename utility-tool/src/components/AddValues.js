import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import actionCreators from '../state/index';
import ValueComp from './Item';

function AddValues() {

    const [Items, setItems] = useState([]);
    const [numbox, setNumbox] = useState(1);
    const [nameHolder, NameEditor] = useState('');


    const dispatch = useDispatch();

    const SubmitIt = (e, id, index) => {

        e.preventDefault();
        let reqInput1 = document.getElementById(`name${index}`);
        let reqInput2 = document.getElementById(`value${index}`);
        const obj = {
            name: reqInput1.value,
            value: reqInput2.value,
        }
        if (obj.value <= 0) {
            alert('Please enter a valid value ! ');
            return;
        }
        const updatedOne = [...Items];
        if (obj.name && obj.value) {
            updatedOne.forEach((item) => {
                if (item.id === id) {
                    item.items = item.items.concat(obj);
                    item.total += parseInt(obj.value);
                    dispatch(actionCreators.AddMoney(parseInt(obj.value)));
                    return;
                }
            })
        } else {
            alert('unable to edit the data');
        }

        setItems(updatedOne);
        reqInput1.value = '';
        reqInput2.value = '';
        CloseModal(`modal${index}`);
    }

    const OpenModal = (index) => {

        const reqModal = document.getElementById(index);
        if (reqModal) {
            document.getElementById('Home').classList.add('blur-box')
            document.getElementById('AllValuesHolder').classList.add('blur-box')
            reqModal.style.display = 'flex';
            reqModal.scrollIntoView({ behavior: 'smooth' });
            reqModal.focus()
        } else {
            alert('Modal cannot be found !');
        }

    }

    const CloseModal = (id) => {

        document.getElementById(id).style.display = 'none';
        document.getElementById('Home').classList.remove('blur-box')
        document.getElementById('AllValuesHolder').classList.remove('blur-box')
    }

    const AddNewBox = () => {
        setItems(Items.concat({ id: `box${numbox}`, name: '', items: [], total: 0 }));
        setNumbox(numbox + 1);
    }

    const EditName = (ItemId, ModalId) => {
        let processed = false;
        const updatedOne = [...Items];
        updatedOne.forEach(ele => {
            if (ele.id === ItemId) {
                ele.name = nameHolder;
                processed = true;
                return;
            }
        })
        CloseModal(ModalId);
        NameEditor('');
        if (!processed) {
            alert('cannot edit the name !');
        }
    }

    return (
        <>

            <div className='addValues' id='AllValuesHolder'>
                {
                    Items.map((Item, index) => {
                        console.log('mapping rightValues named : ', Item.id);
                        return <div className='rightValues' key={Item.id} id={Item.id}>
                            <span className='badge'>{Item.name ? Item.name : 'Enter name'}</span>
                            <div className='listHeader'>
                                <li >Names</li>
                                <li >Values</li>
                            </div>

                            {
                                Item.items.length > 0 ?
                                    Item.items.map(
                                        ele => {
                                            return <ValueComp name={ele.name} value={ele.value} />
                                        }
                                    )
                                    : <div className='listValues'><li><p>Kindly, Enter values</p></li></div>
                            }
                            <hr />
                            <div className='listValues' >
                                <li >Total</li>
                                <li id='values'>{Item.total}</li>
                            </div>
                            <div className='listValues'>
                                <li><button id={`Addbtn${numbox}`} className='submitButton' onClick={() => { OpenModal(`modal${index + 1}`) }}>Add Values</button></li>
                                <li><button className='submitButton' onClick={e => {
                                    e.preventDefault();
                                    NameEditor(Item.name);
                                    OpenModal(`NameEditor${index + 1}`);
                                }}>{Item.name ? 'Rename' : 'Add Name'}</button></li>
                            </div>
                        </div>
                    })
                }

            </div>

            <div className='addValues'>
                <button className='submitButton' onClick={AddNewBox}>Add new box</button>
            </div>

            <div className='modals'>
                {//esilent-disable-next-line
                    Items.map((item, index) => {
                        index++;
                        return <>
                            <div className='InsertValues' key={`modal${index}`} id={`modal${index}`}>
                                <form onSubmit={(e) => { SubmitIt(e, item.id, index) }}>

                                    <input type='text' placeholder='Enter name' name='name' id={`name${index}`} required />
                                    <input type='number' placeholder='Enter Value' name='value' id={`value${index}`} required />
                                    <br />
                                    <button className='submitButton' type='submit'>Add</button>
                                    <button className='submitButton' onClick={(e) => { e.preventDefault(); CloseModal(`modal${index}`) }}>Cancle</button>

                                </form>
                            </div>
                            <div className='InsertValues' key={`NameEditor${index}`} id={`NameEditor${index}`}>
                                <form onSubmit={() => { EditName(item.id, `NameEditor${index}`) }}>
                                    <input type='text' value={nameHolder} onChange={e => { NameEditor(e.target.value) }} id={`name-box${index}`} required minLength={4}></input>
                                    <br/>
                                    <button type='submit' className='submitButton'>Done</button>
                                    <button className='submitButton' onClick={e=>{e.preventDefault();CloseModal(`NameEditor${index}`)}}>Cancle</button>
                                </form>
                            </div>
                        </>
                    })
                }
            </div>

        </>


    )
}

export default AddValues
