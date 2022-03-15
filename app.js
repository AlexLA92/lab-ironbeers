const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  data = {}

  punkAPI
  .getBeers()
  .then(beersFromApi => {
    data.beers = beersFromApi.slice(0, 25)
    res.render('beers', data);
  })
  .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  data = {}

  punkAPI
  .getRandom()
  .then(responseFromAPI => {
    data.beer = responseFromAPI[0]
    res.render('random-beer', data);
  })
  .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
