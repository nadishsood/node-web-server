const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials'); //telling handlebars to add support for partials
//static is the only middleware available on express
app.set('view engine', 'hbs');
//everything is available in req object
app.use((req, res, next) => {
  var now = new Date().toString();
  let log = `${now}:${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server');
    }
  })
  next();
});

//maintainence middleware
// app.use((req, res, next)=>{
//   res.render('maintainence.hbs');
// });

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website',
  });
});


app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',

  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMsg: "Unable to handle request"
  })
})

app.listen(3000, () => {
  console.log("Server is up at port 3000!")
});
