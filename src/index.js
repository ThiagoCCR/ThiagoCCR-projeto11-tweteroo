import express from "express";
import cors from "cors";

const server = express();

server.use(express.json());

server.use(cors());

const users = [];

const tweets = [];

function validateURL(textval) {
  var urlregex =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return urlregex.test(textval);
}

server.post("/sign-up", (req, res) => {
  if (req.body.username === undefined || req.body.avatar === undefined) {
    return res.status(400).send("“Todos os campos são obrigatórios!”");
  } else if (validateURL(req.body.avatar) === false) {
    return res.status(400).send("O Avatar tem que ser uma URL");
  } else {
    users.push(req.body);
    res.sendStatus(201);
  }
});

server.post("/tweets", (req, res) => {
  if (req.body.username === undefined || req.body.tweet === undefined) {
    return res.status(400).send("“Todos os campos são obrigatórios!”");
  } else {
    tweets.push(req.body);
    res.sendStatus(201);
  }
});

server.get("/tweets", (req, res) => {
  const tweetsData = tweets.filter((val, index) => index < 10);

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
