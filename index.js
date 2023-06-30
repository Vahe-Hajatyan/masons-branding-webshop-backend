import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Product from "./module/Product.model.js";
import { postCreateValidator } from "./validations.js";
mongoose
  .connect(
    "mongodb+srv://vahe:janvahejan@cluster0.mesosls.mongodb.net/blog?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error " + err));

const app = express();
const port = process.env.PORT ?? 3333;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  try {
    Product.find({})
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.status(408).json({ error });
      });
  } catch (error) {
    res.json({ error });
  }
});

app.post("/product", postCreateValidator, async (req, res) => {
  const body = req.body;
  try {
    const newPost = new Product({
      myFile: body.myFile,
      comment: body.comment,
      recommended: body.recommended,
      favorites: body.favorites,
      basket: body.basket,
      price: body.price,
      maxCount: body.maxCount,
      name: body.name,
      teg: body.teg.split(","),
      size: body.size.split(","),
      color: body.color.split(","),
      description: body.description,
    });
    const post = await newPost.save();
    res.status(201).json({ msg: "New image uploaded...!", post });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("server ok");
});
