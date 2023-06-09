import express, { Response, Request } from "express";
import axios from "axios";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.post("/events", async (req: Request, res: Response) => {
  try {
    const event = req.body;

    await axios.post("http://localhost:4000/events", event); // posts
    await axios.post("http://localhost:4001/events", event); // comments
    await axios.post("http://localhost:4002/events", event); // query
    await axios.post("http://localhost:4003/events", event); // moderation

    res.status(200).json({ status: event.type });
  } catch (error) {
    console.log(error);
  }
});

app.listen(4005, () => {
  console.log("Listening on port 4005");
});
