import React, {useContext, useState } from 'react'
import '../stylesheets/NoteItem.css';
import NoteContext from '../context/notes/noteContext'
import Modal from './Modal'

const NoteItem = (props) => {
    const { note } = props

    const noteContext = useContext(NoteContext)
    const { deleteNote } = noteContext

    // Defining all the states
    const [modalState, setModalState] = useState(null)

    const showModal = (id, title, description, tag) => {
        setModalState({id, title, description, tag})
    }

    const handleEditClick = () => {
        showModal(note._id, note.title, note.description, note.tag)
    }

    return (
        <>
        <Modal modalState={modalState} setModalState={setModalState} />
        <div className="card">

            <div className="noteOptions">
                <i className="fas fa-trash" onClick={()=>{deleteNote(note._id)}}></i>
                <i className="fas fa-edit" onClick={handleEditClick}></i>
            </div>

            <div className="infoContainer">
                <div className="title">{note.title}</div>
                <div className="description">{note.description}</div>
            </div>

            <span className="sourceInfo">17/11/2004 at 12:45:20</span>

        </div>
        </>
    )
}

export default NoteItem;