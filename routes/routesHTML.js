const path = require('path');
const router = require('express').Router();
// there are two HTML files so the appropriate routes are set up to direct to each html file appropriately.

// The "/notes" route directs to the notes.html file.
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// The "*" is a wild card that directs all other routes to the index.html file.
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;
