import React, { useState } from 'react'
import ValueComp from './Item';
import Modals from './Modals';
import html2Canvas from 'html2canvas';

function AddValues() {

    const [Items, setItems] = useState([]);
    const [numbox, setNumbox] = useState(1);
    const [nameHolder, NameEditor] = useState('');
    const [PrevPosition,setPosition] = useState();


    const DownloadDiv = (id, name, DivToBeHide) => {

        const box = document.getElementById(id);
        const hidingBox = document.getElementById(DivToBeHide);
        box.setAttribute('style','width:500px;');
        const prevDisp  = hidingBox.style.display;
        hidingBox.style.display='none';

        html2Canvas(box).then((canvas) => {
            const URL = canvas.toDataURL('image/png')
            const link = document.createElement('a');
            link.href = URL;
            link.download = name + '.png';
            link.click();
        })

        box.removeAttribute('style');
        hidingBox.style.display=prevDisp;
    }

    const OpenModal = (index) => {

        const reqModal = document.getElementById(index);
        if (reqModal) {
            document.getElementById('Home').classList.add('blur-box')
            document.getElementById('AllValuesHolder').classList.add('blur-box')
            reqModal.style.display = 'flex';
            setPosition(window.scrollY);
            reqModal.scrollIntoView({ behavior: 'smooth' });
            reqModal.focus()
        } else {
            alert('Modal cannot be found !');
        }

    }

    const AddNewBox = () => {
        setItems(Items.concat({ id: `box${numbox}`, name: '', items: [], total: 0 }));
        setNumbox(numbox + 1);
    }



    return (
        <>

            <div className='addValues' id='AllValuesHolder'>
                {
                    Items.map((Item, index) => {
                        return <div key={Item.id} id={`Cover-${Item.id}`}>
                            <div className='rightValues' key={Item.id} id={Item.id}>
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
                                <div className='listValues' id={`Button-holder-${Item.id}`}>
                                    <li><button id={`Addbtn${numbox}`} className='submitButton' onClick={() => { OpenModal(`modal${index + 1}`) }}>Add Values</button></li>
                                    <li><button className='submitButton' onClick={e => {
                                        e.preventDefault();
                                        NameEditor(Item.name);
                                        OpenModal(`NameEditor${index + 1}`);
                                    }}>{Item.name ? 'Rename' : 'Add Name'}</button></li>
                                    <li><button className='submitButton' onClick={e => { e.preventDefault(); DownloadDiv(`Cover-${Item.id}`, Item.name,`Button-holder-${Item.id}`) }}>Dowload</button></li>
                                </div>
                            </div>
                        </div>
                    })
                }

            </div>

            <div className='addValues'>
                <button className='submitButton' onClick={AddNewBox}>Add new box</button>
            </div>

            <Modals NameEditor={NameEditor} nameHolder={nameHolder} Items={Items} setItems={setItems} PrevPosition={PrevPosition} />


        </>


    )
}

export default AddValues
