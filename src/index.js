import express from "express";
import cors from "cors";

const server = express();

server.use(express.json());

server.use(cors());

const users = [];

const tweets = [];

function validateURL(textval) {
  let urlregex =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|html|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return urlregex.test(textval);
}

server.post("/sign-up", (req, res) => {
  const { username } = req.body;
  const { avatar } = req.body;

  if (!username || !avatar) {
    return res.status(400).send("Todos os campos são obrigatórios!");
  } else if (validateURL(avatar) === false) {
    return res.status(400).send("O Avatar tem que ser uma URL");
  } else {
    users.push({username, avatar});
    res.send(tweets)
  }
});

server.post("/tweets", (req, res) => {
  const user = req.headers.user;
  const { tweet } = req.body;

  if (!user || !tweet) {
    return res.status(400).send("Todos os campos são obrigatórios!");
  } else {
    tweets.push({username:user, tweet});
    res.sendStatus(201);
  }
});

server.get("/tweets", (req, res) => {
  const tweetsData = [];

  for (let i = tweets.length - 1; i > 0; i--) {
    if (tweetsData.length < 10) {
      tweetsData.push(tweets[i]);
    }
  }

  tweetsData.reverse();

  tweetsData.forEach((val) => {
    const User = users.find((elem) => elem.username === val.username);
    val.avatar = User.avatar;
  });

  res.send(tweetsData);
});

server.get("/tweets/:name", (req, res) => {
  const urlName = req.params.name;
  const tweetsData = tweets.filter((val) => val.username === urlName);

  tweetsData.forEach((val) => {
    const User = users.find((elem) => elem.username === val.username);
    val.avatar = User.avatar;
  });

  res.send(tweetsData);
});

server.listen(5000, () => {
  console.log("Listening on 5000");
});
