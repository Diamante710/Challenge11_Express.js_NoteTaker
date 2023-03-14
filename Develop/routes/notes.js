const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

notes.post('/', (req, res) => {
    const { email, feedbackType, feedback } = req.body;

    if (email && feedbackType && feedback) {
      const newFeedback = {
        email,
        feedbackType,
        feedback,
        feedback_id: uuidv4(),
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
  
  module.exports = notes;
