import React, { useContext, useState } from 'react'
import '../stylesheets/AddNote.css'
import noteContext from '../context/notes/noteContext'

const AddNote = () => {

    const NoteContext = useContext(noteContext)
    const { addNote } = NoteContext;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleAddNoteClick = (event) => {
        event.preventDefault()
        addNote(note.title, note.description, note.tag)

        setNote({ title: "", description: "", tag: "" })
    }

    const onChange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value })
    }

    return (
        <div className="addNoteForm">
            <h1>Add a note</h1>
            <span>Enter the title for your note</span>
            <input type="text" name="title" value={note.title} id="title" placeholder='Enter note title' onChange={onChange} />

            <span>Enter the description</span>
            <textarea name="description" value={note.description} id="description" placeholder='Enter note description' onChange={onChange} cols="30" rows="10"></textarea>

            {/* <span>Choose a tag for your note</span> */}

            <div className="dropdown">
                <select name="tag" value={note.tag} onChange={onChange}>
                    <option value="General">Select a tag for your note</option>
                    <option value="Home">Home</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                </select>
            </div>

            <button type="submit" onClick={handleAddNoteClick}>ADD NOTE</button>
        </div>
    )
}

export default AddNote;