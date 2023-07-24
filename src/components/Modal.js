import React, { useContext, useState, useEffect } from 'react'
import '../stylesheets/Modal.css'
import noteContext from '../context/notes/noteContext'

const Modal = (props) => {
    const NoteContext = useContext(noteContext)
    const { updateNote, getNotes } = NoteContext;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleUpdateNoteClick = (event) => {
        event.preventDefault()
        updateNote(props.modalState.id, note.title, note.description, note.tag)
        props.setModalState(null)
    }

    const onChange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value })
    }

    useEffect(() => {
        getNotes()
    }, []) // eslint-disable-line

    return (

        <div id="modalContainer" className={`${props.modalState ? 'showModal' : ''}`}>
            <div className="updateModal">
                <h1>Update the note</h1>
                <span>Enter the title for your note </span>
                <input type="text" name="title" id="title" placeholder='Enter note title' onChange={onChange} />

                <span>Enter the description</span>
                <textarea name="description" id="description" placeholder='Enter note description' onChange={onChange} cols="30" rows="10"></textarea>

                <div className="dropdown">
                    <select name="tag" onChange={onChange}>
                        <option value="General">Select a tag for your note</option>
                        <option value="Home">Home</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                    </select>
                </div>

                <div className="modalButtons">
                    <button type="submit" onClick={handleUpdateNoteClick}>Update</button>
                    <button className="modal-button-cancel" onClick={() => { props.setModalState(null) }}>Cancel</button>
                </div>
            </div>
        </div>

    )
}

export default Modal