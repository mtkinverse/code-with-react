import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actionCreators from '../state/index'

function Comp() {

    const amount = useSelector(state => state.amount);
    const dispatch = useDispatch();

    return (

        <div className='container ' style={{textAlign:'center'}}>

            <h3>Update your state here : </h3>
            <button disabled={amount <= 0} className='btn btn-danger mx-2' onClick={() => { dispatch(actionCreators.withdrawMoney(100)) }} >use it</button>
            <button className='btn btn-primary mx-2' onClick={() => { dispatch(actionCreators.depositMoney(100)) }} >Add it</button>
            <br/>
            <button className='btn btn-dark my-3' onClick={()=>{ dispatch(actionCreators.withdrawMoney(amount))}}>Collect All</button>
        </div>

    )
}

export default Comp
