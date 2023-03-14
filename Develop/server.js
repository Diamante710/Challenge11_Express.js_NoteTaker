// bring in dependencies
const express = require('express');
const path = require('path');
const api = require('./routes/index.js');
const PORT = process.env.PORT || 3001;
const app = express();

// configure middleware - declare apps.use etc.

// Routes
    // Homepage
        // eg app.get('/')
        // send back index.html
    // Notes
        // eg app.get('/notes')
    
    // Notes api
        // app.delete('/api/notes/:noteId')
        // app.post('/api/notes')
        // app.get('/api/notes')

// utils file in helper folder. read from file/ write to file
// Make sure to connect front end to back end and deploy to Heroku
// modularize the folders
// console log each below to check and test through insomina.
// step 1 create routes


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

