import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import {
  loginValidator,
  postCreateValidator,
  registerValidator,
} from "./validations.js";
import {
  create,
  getTshirt,
  getAccessories,
  getSneakers,
  getTrousers,
  getOne,
  setComment,
  removeComment,
  removeProduct,
  getCheap,
} from "./controller/productController.js";
import {
  login,
  register,
  me,
  setBasket,
  removeBasket,
  setFavorite,
  removeFavorite,
} from "./controller/userController.js";
import { handlerValidationError } from "./utils/handlerValidationError.js";
import authCheck from "./utils/authCheck.js";
mongoose
  .connect(
    "mongodb+srv://vahe:janvahejan@cluster0.mesosls.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error " + err));

const app = express();
const port = process.env.PORT ?? 3333;

app.use(cors());
app.use(express.json());

app.post("/product", postCreateValidator, handlerValidationError, create);
app.delete("/product/:id", removeProduct);

app.get("/cheap", getCheap);
app.get("/tshirt", getTshirt);
app.get("/trousers", getTrousers);
app.get("/sneakers", getSneakers);
app.get("/accessories", getAccessories);

app.get("/product/:id", authCheck, getOne);

app.post("/comment/:id", setComment);
app.delete("/comment/:id", removeComment);

app.post("/register", registerValidator, handlerValidationError, register);
app.post("/login", loginValidator, handlerValidationError, login);
app.get("/me", authCheck, me);

app.post("/basket", authCheck, setBasket);
app.delete("/basket", authCheck, removeBasket);

app.post("/favorite", authCheck, setFavorite);
app.delete("/favorite", authCheck, removeFavorite);

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("server ok");
});
