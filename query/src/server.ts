import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

type Comments = {
  id: string;
  content: string;
  status: string;
};

type Posts = {
  [key: string]: {
    id: string;
    title: string;
    comments: Comments[];
  };
};

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

const posts: Posts = {};

app.get("/posts", (_req: Request, res: Response) => {
  res.status(200).json(posts);
});

app.post("/events", (req: Request, res: Response) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];

    post.comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];

    const comment = post.comments.find((comment) => comment.id === id);

    if (comment) {
      comment.status = status;
      comment.content = content;
    }
  }

  console.log(type);
  res.status(200).end();
});

app.listen(4002, () => {
  console.log("Listening on port 4002");
});
