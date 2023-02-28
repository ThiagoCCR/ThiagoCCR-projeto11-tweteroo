import express from "express";
import cors from "cors";
import authRouter from "./routers/authRouter.js";
import tweetsRouter from "./routers/tweetsRouter.js";

const server = express();

server.use(express.json());
server.use(cors());
server.use(authRouter);
server.use(tweetsRouter);

server.listen(5000, () => {
  console.log("Listening on 5000");
});
