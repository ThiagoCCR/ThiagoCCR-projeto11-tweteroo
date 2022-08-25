import express from 'express';

const server = express();

server.use(express.json())

const users = [];

const tweets = [];

server.post('/sign-up', (req, res) => {

  users.push(req.body);

  res.send('OK');

});

server.listen(5000, () => {
  console.log('Listening on 5000');
});