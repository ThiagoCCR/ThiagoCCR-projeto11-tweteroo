import authController from "./authController.js";

class tweetsController {
  constructor() {
    this.tweets = []
    this.postTweet = this.postTweet.bind(this)
    this.getTweets = this.getTweets.bind(this)
    this.getTweetsByUserame = this.getTweetsByUserame.bind(this)
  }

  postTweet(req, res) {
    const user = req.headers.user;
    const { tweet } = req.body;

    if (!user || !tweet) {
      return res.status(400).send("Todos os campos são obrigatórios!");
    } else {
      this.tweets.push({ username: user, tweet });
      res.sendStatus(201);
    }
  }

  getTweets(req, res) {
    const tweetsData = [];

    for (let i = this.tweets.length - 1; i > 0; i--) {
      if (tweetsData.length < 10) {
        tweetsData.push(this.tweets[i]);
      }
    }

    tweetsData.reverse();

    tweetsData.forEach((val) => {
      const User = authController.users.find((elem) => elem.username === val.username);
      val.avatar = User.avatar;
    });

    res.send(tweetsData);
  }

  getTweetsByUserame(req, res) {
    const username = req.params.name;
    const tweetsData = this.tweets.filter((val) => val.username === username);

    tweetsData.forEach((val) => {
      const User = authController.users.find(
        (elem) => elem.username === val.username
      );
      val.avatar = User.avatar;
    });

    res.send(tweetsData);
  }
}

export default new tweetsController();