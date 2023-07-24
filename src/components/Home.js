import React from 'react'
import Notes from './Notes';
import '../stylesheets/Home.css'
import AddNote from './AddNote';

export const Home = () => {
  return (
    <div className="home-container">

      <AddNote />

      <Notes />

    </div>
  )
}

export default Home;
