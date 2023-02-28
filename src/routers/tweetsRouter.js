import { Router } from "express";
import tweetsController from "../controllers/tweetsController.js";

const tweetsRouter = Router();

tweetsRouter.post("/tweets", tweetsController.postTweet);

tweetsRouter.get("/tweets", tweetsController.getTweets);

tweetsRouter.get("/tweets/:name", tweetsController.getTweets);

export default tweetsRouter;
