const express = require('express');
const app = express();
const bodyParser = require('body-parser');


// MODELS-----------------------------------------
// require the fruits model
const Fruits = require('./models/fruits')
// model names should be capitalized



// MIDDLEWARE-----------------------------------------
// note: all requests go thru middleware before they hit the route (car wash)
// also note: ****** we app.use() middleware*****

// bodyParser allows us to easily access form data from within req object
app.use(bodyParser.urlencoded({
  extended: false
}))

// you can write your own middleware (example)
app.use((req, res, next) => {
  console.log('Hey! Thanks for stopping by!\nThis message is brought 2 u by MIDDLEWARE!\nAll routes must pass thru me. :)')
  // this means: "ok, HTTP request, you may continue to wherever you were headed"
  next(); 
})



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
  // if(req.body.readyToEat === 'on') {
  //   req.body.readyToEat = true
  // } else {
  //   req.body.readyToEat = false
  // }
  // Fruits.push(req.body)


  // actually take the data from the request and add it to our model
  let ready = false
  if(req.body.readyToEat === 'on') {
    ready = true
  }
  const newFruit = {
    name: req.body.name,
    color: req.body.color,
    readyToEat: ready
  }
  Fruits.push(newFruit)
  console.log(Fruits)


  // res.send('Post worked')
  // let the user see that the fruit got added by redirecting them
  // to index instead of just res.sending some text
  res.redirect('/fruits')
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



