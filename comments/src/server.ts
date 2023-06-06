import express, { Request, Response } from "express";
import { randomBytes } from "crypto";
import cors from "cors";

type CommentsBytPostId = {
  [key: string]: {
    id: string;
    content: string;
  }[];
};

const app = express();

const commentsByPostId: CommentsBytPostId = {};

app.use(express.json());
app.use(cors());

app.get("/posts/:id/comments", (request: Request, response: Response) => {
  const { id } = request.params;

  response.status(200).send(commentsByPostId[id] || []);
});

app.post("/posts/:id/comments", (request: Request, response: Response) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = request.body;
  const { id } = request.params;

  const comments = commentsByPostId[id] || [];

  comments.push({ id: commentId, content });

  commentsByPostId[id] = comments;

  response.status(201).send(comments);
});

app.listen(4001, () => {
  console.log("Listening on port 4001");
});
