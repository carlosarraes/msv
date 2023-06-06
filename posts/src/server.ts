import express, { Request, Response } from "express";
import { randomBytes } from "crypto";
import cors from "cors";

type Post = {
  id: string;
  title: string;
};

const app = express();

app.use(express.json());
app.use(cors());

const posts: { [key: string]: Post } = {};

app.get("/posts", (req: Request, res: Response) => {
  res.status(200).send(posts);
});

app.post("/posts", (req: Request, res: Response) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
