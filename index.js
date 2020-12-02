const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser());
class Review {
  constructor(id, author, score, comment) {
    this.id = id;
    this.author = author;
    this.score = score;
    this.comment = comment;
  }
}
const initialStorage = [
  new Review(1, 'John McClane', 5, 'Всё отлично, мы можем работать дальше!'),
  new Review(2, 'Ashton Kutcher', 2, 'Качество товара могло быть и лучше...'),
  new Review(3, 'Natalie Portman', 3, 'Норм!')
];
const appStorage = initialStorage.slice(0);
app.get('/review/list', function (req, res) {
  res.json(appStorage);
});
app.post('/review/add', (req, res) => {
  if (!req.body) {
    return res.json({ status: 'bad-request' });
  }
  if (!req.body.score || !req.body.author || !req.body.comment) {
    return res.json({ status: 'bad-request' });
  }
  const review = new Review(appStorage.length + 1, req.body.author, req.body.score, req.body.comment);
  appStorage.push(review);
  res.json({ status: 'ok', result: { review } });
});
app.post('/reset', (req, res) => {
  appStorage = initialStorage.slice(0);
  res.json({ status: 'ok' });
});
app.listen(3010, function () {
  console.log('Web server listening on port 3010');
});