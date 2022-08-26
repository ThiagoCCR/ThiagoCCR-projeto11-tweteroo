import express from 'express';
import cors from 'cors';

const server = express();

server.use(express.json());

server.use(cors());

const users = [];

const tweets = [];

server.post('/sign-up', (req, res) => {

  users.push(req.body);

  res.send("OK");

});

server.post('/tweets', (req, res) => {

  tweets.push(req.body);

  res.send("OK");

});

server.get('/tweets', (req, res) => {

  const tweetsData = tweets.filter((val,index)=> index < 10) 


  tweetsData.forEach((val)=>{
      const User = users.find((elem)=> elem.username === val.username);
      console.log(User)
      val.avatar = User.avatar;
  })

  res.send(tweetsData);

});

server.listen(5000, () => {
  console.log('Listening on 5000');
});