'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Book = require('./models/book.js');
mongoose.connect(process.env.DB_URL);
const verifyUser = require('./auth');
const { JwksRateLimitError } = require('jwks-rsa');

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
app.put('/books/:id', putBooks);

//REST=>GET Mongoose Model.find()
async function getBooks(request, response, next) {
  verifyUser(request, async (err, user) => {
    if (err) {
      console.error(err);
      response.send('invalid token');
    } else {
      try {
        // let resultsEmail = await Book.find({email:req.query.email})
        let queryObject = {};
        if (user.email) {
          queryObject.email = user.email;
        }
        //gets things from db .find
        let results = await Book.find(queryObject);
        response.status(200).send(results);
      }
      catch (error) {
        next(error);
      }
    }
  });
}
//REST=>POST Mongoose Model.create()
async function postBooks(request, response, next) {
  console.log(request.body);
  try {
    let newBookInstance = await Book.create(request.body);
    response.status(200).send(`New Book Added ${newBookInstance}`);
  }
  catch (error) {
    next(error);
  }
}

//REST=>Delete Mongoose Model.findByIdAndDelete()
async function deleteBooks(request, response, next) {
  let id = request.params.id;
  try {
    console.log(id);
    await Book.findByIdAndDelete(id);
    response.send(`Book Deleted ${id}`);
  }
  catch (error) {
    next(error);
  }
}
//REST=>Delete Mongoose Model.findByIdAndUpdate)
async function putBooks(request, response, next) {
  try {
    let id = request.params.id;
    let updatedBook = await Book.findByIdAndUpdate(id, request.body, { new: true, overwrite: true })
    response.status(200).send(updatedBook);
    console.log(`Book updated ${updatedBook}`);
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