const express = require('express');
const app = express();

//require the fruits model
const Fruits = require('./models/fruits')
// model names should be capitalized


// index route
// should show all the fruits
app.get('/fruits', (req, res) => {
  res.render('index.ejs', {
    fruit: Fruits
  })
})

// new route
// show a form for user to enter data to add 
app.get('/fruits/new', (req, res) => {
  res.render('new.ejs')
})

// create route
app.post('/fruits', (req, res) => {
  console.log(req.body) // sure would be nice if user form data was here
  res.send('Post worked')
})

// show route
// show just one fruit
app.get('/fruits/:index', (req, res) => {
  res.render('show.ejs', {
    fruit: Fruits[req.params.index]
  })
  //render is when you want to show an ejs template to the client
})


app.listen(3000, () => {
  const timestamp = (new Date(Date.now())).toLocaleString();
  console.log('\n' + timestamp + ': listening on port 3000\n')
});



