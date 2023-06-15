import express, { Request, Response } from "express";
import { randomBytes } from "crypto";
import cors from "cors";
import axios from "axios";
import morgan from "morgan";

type Post = {
  id: string;
  title: string;
};

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

const posts: { [key: string]: Post } = {};

app.get("/posts", (_req: Request, res: Response) => {
  res.status(200).json(posts);
});

app.post("/posts/create", async (req: Request, res: Response) => {
  try {
    const id = randomBytes(4).toString("hex");
    const { title } = req.body;

    posts[id] = {
      id,
      title,
    };

    await axios.post("http://event-bus-srv:4005/events", {
      type: "PostCreated",
      data: {
        id,
        title,
      },
    });

    res.status(201).json(posts[id]);
  } catch (error) {
    console.log(error);
  }
});

app.post("/events", (req: Request, res: Response) => {
  console.log("Received event:", req.body.type);

  res.status(200).end();
});

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
