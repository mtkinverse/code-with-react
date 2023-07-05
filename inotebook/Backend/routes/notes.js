const express = require('express');
const router = express.Router();
const Notes = require('../modules/Notes')
const { body, validationResult } = require('express-validator');
const fetchUser = require('../middleware/fetchuser');


//Route # 1 : to get all the notes of the user
router.get('/fetchall', fetchUser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
})


//Route # 2 : to add a new note for the user
router.post('/addnewnote', [
    body('title', 'Please enter a valid title').isLength({ min: 3 }),
    body('description', 'Description cannot be less than 5 characters').isLength({ min: 5 })
]
    , fetchUser, async (req, res) => {

        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ result: result.array() });
        }

        const { title, description, comments } = req.body;

        try {
            const note = new Notes({
                title, description, comments, user: req.user.id
            })
            const savedNote = await note.save();
            res.json({ savedNote });

        } catch (error) {
            console.error(error.message);
            res.status(500).send('Internal server error occured !');
        }
    })


//Route # 3 : to update a note for the user
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const { title, description, comments } = req.body;

    try {
        let newNote = {};

        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (comments) { newNote.comments = comments }

        let note = await Notes.findById(req.params.id);

        if (!note) { return res.status(404).send("No note is found against your id ! ") }

        if (note.user.toString() !== req.user.id) { return res.status(401).send("Unauthorized person not allowed ! ") }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("An internal server error occured ! ");
    }
})

//Route # 4 : Delete the note of a user against an specific user and note id

router.delete('/deletenote/:id', fetchUser, async (req, res) => {

    try {


        let note = await Notes.findById(req.params.id);

        if (!note) { return res.status(404).send("No note is found against the specified id ! ") }
        if (note.user.toString() !== req.user.id) { return res.status(401).send("Unauthorized person not allowed ! ") }
        
        note =await Notes.findByIdAndDelete(req.params.id);
        res.json({ Deleted: 'notes deleted successfully !', note: note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("An internal sever error occured ! ");
    }
})


module.exports = router;