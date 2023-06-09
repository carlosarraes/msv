import express, { Request, Response } from "express";
import { randomBytes } from "crypto";
import axios from "axios";
import cors from "cors";
import morgan from "morgan";

type CommentsBytPostId = {
  [key: string]: {
    id: string;
    content: string;
    status: string;
  }[];
};

const app = express();

const commentsByPostId: CommentsBytPostId = {};

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.get("/posts/:id/comments", (request: Request, response: Response) => {
  const { id } = request.params;

  response.status(200).send(commentsByPostId[id] || []);
});

app.post(
  "/posts/:id/comments",
  async (request: Request, response: Response) => {
    try {
      const commentId = randomBytes(4).toString("hex");
      const { content } = request.body;
      const { id } = request.params;

      const comments = commentsByPostId[id] || [];

      comments.push({ id: commentId, content, status: "pending" });

      commentsByPostId[id] = comments;

      await axios.post("http://localhost:4005/events", {
        type: "CommentCreated",
        data: {
          id: commentId,
          content,
          postId: id,
        },
      });

      response.status(201).send(comments);
    } catch (error) {
      if (error instanceof Error)
        response.status(500).send({ message: error.message });
    }
  }
);

app.post("/events", async (req: Request, res: Response) => {
  console.log("Received event:", req.body.type);

  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { id, postId, status, content } = data;

    const comments = commentsByPostId[postId];

    const comment = comments?.find((comment) => comment.id === id);

    if (comment) {
      comment.status = status;
    }

    await axios.post("http://localhost:4005/events", {
      type: "CommentUpdated",
      data: {
        id,
        postId,
        status,
        content,
      },
    });
  }

  res.status(200).end();
});

app.listen(4001, () => {
  console.log("Listening on port 4001");
});
