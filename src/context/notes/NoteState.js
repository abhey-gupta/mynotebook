import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {

    const host = "http://localhost:4000"

    const notesInitial = []

    // Defining all the states
    const [notes, setNotes] = useState(notesInitial)

    // Get notes
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setNotes(json)
    }



    // Add a note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });

        const note = await response.json() // must await as response.json() is asynchronous and leads to errors when not awaited

        setNotes(notes.concat(note))
    }

    // Function to delete note
    const deleteNote = async (id) => {
        // making fetch request to delete from the backend
        await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        });

        // logic to remove from frontend
        setNotes(notes.filter((note) => {
            return note._id !== id;
        }))

    }

    // Update note
    const updateNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const updatedNote = await response.json()
        console.log(updatedNote)
        
        setNotes(notes.map((note)=>{     // React needs a new array to reflect the changes in the frontend UI, if we directly edit the notes and then do setNotes(notes), it wont show the changes in the frontend UI, instead we need to do something like setNotes(newNotes) and the array.map() function does exactly what we want as it returns a new array
            if(note._id === id){
                return { ...notes, title: title, description: description, tag: tag}
            }
            return notes;
        }))
    }

    return (
        // value={{notes, setNotes}} is same as writing {{notes: notes, setNotes: setNotes}}
        <NoteContext.Provider value={{ notes, addNote, deleteNote, updateNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;