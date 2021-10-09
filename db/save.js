const util = require('util');
const fs = require('fs');

// This unique ID variable generates the unique IDs. 
const uniqueID = require('uuid/v1');
// These variables for reading and writing the notes.
const fileRead = util.promisify(fs.readFile);
const fileWrite = util.promisify(fs.writeFile);

// This is the class that SAVES retrieves, adds, and deletes notes. 
class Save {
  // This function reads the note from the file.
  readFile() {
    return fileRead('db/db.json', 'utf8');
  }
  // This function writes the note to the file.
  writeFile(note) {
    return fileWrite('db/db.json', JSON.stringify(note));
  }
  // This function gathers the notes, analyzes then, and returns an empty array.
  retrieveNotes() {
    return this.readFile().then((notes) => {
      let analyzeNotes;

      // This turns the notes into an array. It then sends back an empty array.
      try {
        analyzeNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        analyzeNotes = [];
      }

      return analyzeNotes;
    });
  }
  // This function is used when a user is adding a new note. 
  newNote(note) {
    const { title, text } = note;
    // This is input validation requiring the title and note to both have at least 1 character.
    if (!title || !text) {
      throw new Error("Note 'title' and 'text' both have a 1 character minimum requirement!");
    }

    // This adds a unique ID to the new note as well as the title and text.
    const newNote = { title, text, id: uniqueID() };

    // This retrives all the notes, writes all the updated notes, adds the new note, and returns the newNote.
    return this.retrieveNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.writeFile(updatedNotes))
      .then(() => newNote);
  }
  // This function deletes the note.
  deleteNote(id) {
    // This retrieves all notes, remotes the note with the specified unique ID, and finally writes the filtered notes.
    return this.retrieveNotes()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((filteredNotes) => this.writeFile(filteredNotes));
  }
}

module.exports = new Save();
