import React, { useRef } from 'react'
import {useSelector} from 'react-redux';

function Navbar() {

    const amount = useSelector(state => state.amount);
    const dropdownRef = useRef();

    const ToggleDropdown = () => {

        if (dropdownRef.current.style.display === "flex") {
            dropdownRef.current.style.display = "none";
        } else {
            dropdownRef.current.style.display = "flex";
        }

    }


    return (
        <nav>
            <div className="NameAndImage">
                <b>BillEase</b>
            </div>
            <div className='clear-both'></div>
            <div className="NavContent">
                <li><a href="#home">Home</a></li>
                <li><a href="#record">Record</a></li>
                <li><a href="#report">Report</a></li>
                <li id="valuePlacer">Net value:{amount}</li>
            </div>
            <div className="navBtn" onClick={ToggleDropdown}><hr /><hr /><hr /></div>
            <div className='valuePlacer' id='valuePlacer'>Value:{amount}</div>
            <div className='dropdown' ref={dropdownRef}>
                <li><a href="#home" onClick={ToggleDropdown}>Home</a></li>
                <li><a href="#record" onClick={ToggleDropdown}>Record</a></li>
                <li><a href="#report" onClick={ToggleDropdown}>Report</a></li>
            </div>
        </nav>
    )
}

export default Navbar
