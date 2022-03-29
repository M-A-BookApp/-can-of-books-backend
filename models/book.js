'use strict';

// bring in mongoose 
const mongoose = require('mongoose');

const { Schema } = mongoose;
// create a cat schema, define how our object will be structured
const bookSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: Boolean, required: true },
  email: { type: String, required: true },
});

const BookModel = mongoose.model('Book', bookSchema);

module.exports = BookModel;

