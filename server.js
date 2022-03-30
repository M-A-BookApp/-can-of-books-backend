'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const Book = require('./models/book.js')

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

const app = express();

//middleware
app.use(cors());

//must have this to receive json from a request
app.use(express.json());

const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
  response.status(200).send('welcome')
});

app.get('/books', getBooks);
app.post('/books', postBooks);
app.delete('/books/:id', deleteBooks);

//REST=>GET Mongoose Model.find()
async function getBooks(request, response, next) {
  try {
    // let resultsEmail = await Book.find({email:req.query.email})
    let queryObject = {};
    if (request.query.location) {
      queryObject.location = req.query.location;
    }
    //gets things from db .find
    let results = await Book.find();
    response.status(200).send(results);
  }
  catch (error) {
    next(error);
  }
}
//REST=>POST Mongoose Model.create()
async function postBooks(request, response, next) {
  console.log(request.body);
  try {
    let newBookInstance = await Book.create(request.body);
    response.status(200).send(newBookInstance);
  }
  catch (error) {
    next(error);
  }
}

//REST=>Delete Mongoose Model.findByIdDelete()
async function deleteBooks(request, response, next) {
  let id = request.params.id;
  try {
    console.log(id);
    await Book.findByIdAndDeleted(id);
    response.send('Book Deleted');
  }
  catch (error) {
    next(error);
  }
}

app.get('/test', (request, response) => {
  response.send('test request received')
});

app.get('*', (request, response) => {
  response.status(404).send('not available')
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));