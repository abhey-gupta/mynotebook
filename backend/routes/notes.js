const express = require('express')
const router = express.Router()
const Notes = require('../models/Notes')
const fetchuser = require('../middlewares/fetchuser')
const { body, validationResult } = require('express-validator');


// ROUTE 1 : fetching all the notes of a user
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id })
    res.json(notes)
})


// ROUTE 2 : Add a new note 
router.post('/addnote', fetchuser, [
    body('title', 'Title must not be empty').isLength({ min: 1 }),
    body('description', 'Description must not be empty').isLength({ min: 1 }),
], async (req, res) => {

    // Using express-validator to validate the data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    // Creating a new note 
    let note = await Notes.create({
        user: req.user.id,
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag
    })

    res.json(note)

})


// ROUTE 3 : Update an existing note
router.put('/updatenote/:id', fetchuser, async (req, res) => {

    const { title, description, tag } = req.body;

    // Creating a new note 
    let newNote = {}

    if (title) { newNote.title = title }
    if (description) { newNote.description = description }
    if (tag) { newNote.tag = req.body.tag }

    // find the note to be updated and update it 
    let note = await Notes.findById(req.params.id)
    if(!note){
        res.status(404).send("Not found")
    }

    if(note.user.toString() !== req.user.id) {
        res.status(401).send("Not Allowed")
    }

    note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true}) // Usually when you perform update operations in mongoose, it returns the previous state of the document (before it was updated) and not the updated one. By setting "new" to true in the third argument of the object in "findByIdAndUpdate()", we tell mongoose to return the updated state of the object instead of its default behaviour

    res.json(newNote)

})


// ROUTE 4 : Delete an existing note
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    // find the note to be deleted and delete it 
    let note = await Notes.findById(req.params.id)
    if(!note){
        res.status(404).send("Not found")
    }

    // check if the id of the user related 
    if(note.user.toString() !== req.user.id) {
        res.status(401).send("Not Allowed")
    }

    note = await Notes.findByIdAndDelete(req.params.id) 

    res.send("Success, the note has been deleted")

})

module.exports = router