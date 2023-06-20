import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT ?? 3333;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("hello world");
});

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("server ok");
});
