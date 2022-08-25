import express from 'express';

const server = express();

server.get('/sign-up', (req, res) => {
  
  res.send(forecast);

});

server.listen(5000, () => {
  console.log(' Listening 5000');
});