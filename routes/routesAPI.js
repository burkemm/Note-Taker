const router = require('express').Router();
const save = require('../db/save');

// This retrieves "/api/notes" and responds with all notes from the database.
router.get('/notes', (req, res) => {
  save
    .retrieveNotes()
    .then((notes) => {
      return res.json(notes);
    })
    .catch((err) => res.status(500).json(err));
});
// This updates to the "/api/notes" by adding the new note
router.post('/notes', (req, res) => {
  save
    .newNote(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));
});

// delete "api/notes" deleted the note with id equal to req.params.id.
router.delete('/notes/:id', (req, res) => {
  save
    .deleteNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
