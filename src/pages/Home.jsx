import { useState } from 'react'
import '../App.css'
import SearchIcon from '../assets/search.svg'
import NoteCard from '../components/NoteCard'
import '../styles/NoteCard.css'
import notes from '../services/dataStore'
function Home() {


  return (
    <>
      <div className='app'>
        <h1>flashNotes</h1>
        <div className='search'>
          <input 
          type="text"
          placeholder='搜索您的笔记'
          onChange={()=>{}}
          />
           <img 
          src={SearchIcon}
          alt='search'
        />
        </div>
       

      </div>
      <div className='notes-container'>
        {
          notes?.length > 0 ? (       
            notes.map((note) => (
              <NoteCard key={note.id} note={note}  />
            ))
          ) : (
           <>
           <div ><NoteCard note={null}/></div>
           <div className='empty'><h2>No Notes Found</h2></div>
           </> 
          )
        }
      </div>
 
    </>
  )
}

export default Home
