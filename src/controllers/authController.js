class AuthController {
  constructor() {
    this.users = []
    this.signUp = this.signUp.bind(this)
  }

  signUp(req, res) {
    const { username, avatar } = req.body;

    if (!username || !avatar) {
      return res.status(400).send("Todos os campos são obrigatórios!");
    }

    this.users.push({ username, avatar });

    res.status(201).send("OK");
  }
}

export default new AuthController();
