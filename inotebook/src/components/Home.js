import React from 'react';
import AddNotes from './AddNotes';
import Notes from './Notes';

function Home() {
  return (
    <div>
      <h3>Manage your notes in this difficult era ,easily</h3>
      <AddNotes/>
      <h3>View your notes here</h3>
      <Notes/>
    </div>
  )
}

export default Home
