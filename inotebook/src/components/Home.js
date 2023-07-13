import React from 'react';
import AddNotes from './AddNotes';
import Notes from './Notes';

function Home() {
  return (
    <div>
      <h3 className='d-flex justify-content-center my-4'>Manage your notes in this difficult era ,easily !</h3>
      <AddNotes/>
      <h3>&#10003;<div className='vr mx-2 border border-secondary border-2'></div>View your notes here</h3>
      <Notes/>
    </div>
  )
}

export default Home
