import express from 'express';

const server = express();

server.use(express.json())

const users = [];

const tweets = [];

server.post('/sign-up', (req, res) => {

  users.push(req.body);

  res.send('OK');

});

server.post('/tweets', (req, res) => {

  tweets.push(req.body);

  res.send('OK');

});

server.get('/tweets', (req, res) => {

  const tweetsData = tweets.filter((val,index)=> index < 10) 

  res.send(tweetsData);

});


server.listen(5000, () => {
  console.log('Listening on 5000');
});