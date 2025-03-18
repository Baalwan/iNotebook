const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const fetchuser = require('../middleware/fetchUser');
const Notes = require('../models/Notes');
const { findByIdAndUpdate } = require('../models/Users');

// Route 1: Get all the notes of logged-in user using: GET '/api/notes/fetchallnotes'
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

//Route 2:  Add notes using: POST '/api/notes/addnotes'
router.post(
    '/addnotes',
    fetchuser,
    [
        body('title', 'Title is too short').isLength({ min: 3 }),
        body('description', 'Description must be at least 8 characters').isLength({ min: 8 })
    ],
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;

            // Validate request
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // Create new note
            const note = new Notes({
                title,
                description,
                tag,
                user: req.user.id
            });

            const savedNote = await note.save();
            res.json(savedNote);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Internal Server Error');
        }
    }
);

// Route 3: Update an existing note using: PUT '/api/notes/updatenotes/:id'
router.put(
    '/updateNotes/:id',
    fetchuser,
    [
        body('title', 'Title must be at least 3 characters').optional().isLength({ min: 3 }),
        body('description', 'Description must be at least 8 characters').optional().isLength({ min: 8 })
    ],
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;

            // Validate request
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // Create an updated note object
            const newNote = {};
            if (title) newNote.title = title;
            if (description) newNote.description = description;
            if (tag) newNote.tag = tag;

            // Find the note to be updated
            let note = await Notes.findById(req.params.id);
            if (!note) {
                return res.status(404).json({ error: "Note not found" });
            }

            // Ensure the user owns the note
            if (note.user.toString() !== req.user.id) {
                return res.status(401).json({ error: "Unauthorized access" });
            }

            // Update the note
            note = await Notes.findByIdAndUpdate(
                req.params.id,
                { $set: newNote },
                { new: true }
            );

            res.json(note);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Internal Server Error');
        }
    }
);

// Route 4: Delete an existing note using: DELETE '/api/notes/deleteNote/:id'
router.delete('/deleteNote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be deleted
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        // Ensure the user owns the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ error: "Unauthorized access" });
        }

        // Delete the note
        await Notes.findByIdAndDelete(req.params.id);

        res.json({ message: "Note deleted successfully", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;
