'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./models/book.js');

mongoose.connect(process.env.DB_URL);

async function seed() {
  await Book.create({
    title: 'Harry Potter and the Philosopher\'s Stone',
    description: 'Harry Potter and the Philosopher\’s Stone, published in 1997, is the first book in the Harry Potter series and introduces the character of Harry Potter. It\’s no secret that this is the book that got a whole generation of children reading, and the book doesn\’t disappoint. We learn about Harry\’s miserable life living in a cupboard under the stairs in the house of his ghastly aunt and uncle followed by the liberating news that he is a famous wizard and will not remain the downtrodden orphan forever. Leaving the direness of suburbia behind, he goes off to boarding school at Hogwarts.',
    status: false,
    email: 'michellesalazar010@gmail.com',
  })
  await Book.create({
    title: 'Harry Potter and the Chamber of Secrets',
    description: 'Harry Potter and the Chamber of Secrets is the second book in the Harry Potter series, first published in 1998. The format follows that of the first book, the events taking place in Harry\'s second year at boarding school. It\'s a nice, neat storyline, full of suspense and with little jokes along the way for the adult reading the book. For example, we are introduced to a new teacher: a publicity-obsessed narcissist by the name of Gilderoy Lockhart, who has written an autobiography with the inspired title, Magical Me.',
    status: true,
    email: 'michellesalazar010@gmail.com',
  })
  await Book.create({
    title: 'Harry Potter and the Prisoner of Azkaban',
    description: 'Harry Potter and the Prisoner of Azkaban is the third book in the series and was published in 1999. In it, J.K. Rowling really gets into her stride. For younger kids, this is the book in the series that possibly hits the sweet spot, more complex in plot and tone than the first two, but not yet as long a read as the last four. We start to learn much more about Harry\'s parents and what happened before he was left on the Dursleys\' doorstep as a baby, a vital step in the feeling you get from the Harry Potter books that this is not just another boy magician who features in a book, but a person you\'re getting to know.',
    status: true,
    email: 'michellesalazar010@gmail.com',
  })
  mongoose.disconnect();
}

seed();