import express, { Response, Request } from "express";
import axios from "axios";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

type Event = {
  type: string;
  data: any;
};

const events: Event[] = [];

app.post("/events", async (req: Request, res: Response) => {
  try {
    const event = req.body;

    events.push(event);

    await axios.post("http://posts-clusterip-srv:4000/events", event); // posts
    await axios.post("http://comments-srv:4001/events", event); // comments
    await axios.post("http://query-srv:4002/events", event); // query
    await axios.post("http://moderation-srv:4003/events", event); // moderation

    console.log("Received event:", event.type);
    res.status(200).json({ status: event.type });
  } catch (error) {
    console.log(error);
  }
});

app.get("/events", (_req: Request, res: Response) => {
  res.status(200).send(events);
});

app.listen(4005, () => {
  console.log("Listening on port 4005");
});
