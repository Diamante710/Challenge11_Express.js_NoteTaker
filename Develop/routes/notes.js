const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
  const { title, text } = req.body;
  console.log(req.body)
  if (title && text) {
    const newFeedback = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newFeedback, './db/db.json');

    const response = {
      status: 'success',
      body: newFeedback,
    };

    res.json(response);
  } else {
    res.json('failure');
  }
});

notes.delete('/:id', (req, res) => {
  readFromFile('./db/db.json').then((data) => {
    const saveNote = JSON.parse(data)
    const filteredNotes = saveNote.filter(note => note.id !== req.params.id)
    writeToFile('./db/db.json', filteredNotes)
    res.json("Note Deleted")
  })
})
module.exports = notes;
