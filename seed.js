'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const BookModel = require('./models/book');
mongoose.connect(process.env.DB_URL);

async function seed() {
  await Book.create({
    title: '',
    description: '',
    status: '',
    email: '',

  })
  mongoose.disconnect();
}
seed();