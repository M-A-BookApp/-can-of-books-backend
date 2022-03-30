'use strict';

const { default: mongoose } = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.DB_URL);
const Book = require('./models/book');

async function clear() {
  try {
    await Book.deleteMany({});
    console.log('books cleared from DB';)
  } catch (err) {
    console.log(err);
  } finally {
    mongoose.disconnect();
  }
}
clear();