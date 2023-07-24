import React, { useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import NoteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem'
import '../stylesheets/Notes.css'

export const Notes = () => {
    const noteContext = useContext(NoteContext)
    const { notes, getNotes } = noteContext

    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')){
        getNotes()
        } else {
            navigate('/login')
        }
    }, []) // eslint-disable-line

    return (
        <>
            <h1 className='text-center'>Your notes</h1>
            <div className="notes-container">

                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} />
                })}

            </div>
        </>
    )
}
export default Notes;