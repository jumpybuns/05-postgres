const express = require('express');
const Beer = require('./models/Beer');
const app = express();
app.use(express.json);

app.post('/beer', async(req, res) => {
  const beer = await Beer.insert(req.body);
  res.send(beer);
    // .insert(req.body)
    // .then(beer => res.send(beer));
});

app.get('/beer', (req, res) => {
  Beer
    .find(req.body)
    .then(beer => res.send(beer));
});

app.post('/beer', (req, res) => {
  Beer
    .update(req.body.id)
    .send(beer => res.send(beer));

});

app.delete('./beer', (req, res) => {
  Beer
    .delete(req.body.id)
    .send(beer => res.body(beer));
});

app.listen(7890, () => {
  console.log('started on 7890');
});

