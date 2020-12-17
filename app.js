const express = require('express');
const Beer = require('./models/Beer');
const app = express();


app.use(express.json());

app.post('/beer', (req, res, next) => {
  Beer
    .insert(req.body)
    .then(beer => res.send(beer))
    .catch(next);

});

app.get('/beer', (req, res, next) => {
  Beer
    .find(req.body)
    .then(beers => res.send(beers))
    .catch(next);
});

app.get('/beer/:id', (req, res, next) => {
  Beer
    .findById(req.params.id)
    .then(beer => res.send(beer))
    .catch(next);

});
  

app.put('/beer/:id', (req, res, next) => {
  Beer
    .update(req.params.id, req.body)
    .then(beer => res.send(beer))
    .catch(next);

});

app.delete('/beer/:id', (req, res, next) => {
  Beer
    .delete(req.params.id)
    .then(beer => res.send(beer))
    .catch(next);
});


module.exports = app;
