import ProductModel from "../module/Product.model.js";
import { v4 as uuidv4 } from "uuid";
import UserModel from "../module/User.model.js";

export const create = async (req, res) => {
  try {
    const newPost = new ProductModel({
      myFile: req.body.myFile,
      comment: req.body.comment,
      recommended: req.body.recommended,
      favorites: req.body.favorites,
      basket: req.body.basket,
      price: req.body.price,
      maxCount: req.body.maxCount,
      name: req.body.name,
      teg: req.body.teg.split(","),
      size: req.body.size.split(","),
      color: req.body.color.split(","),
      description: req.body.description,
      type: req.body.type,
    });
    await newPost.save();
    res.status(201).json({ msg: "uploaded...!" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const getOne = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    await UserModel.findById(req.userId).then((doc) =>
      doc.favorite.some((el) =>
        el.id == product._id
          ? (product.favorites = true)
          : (product.favorites = false)
      )
    );
    res.json(product);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const removeProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    ProductModel.findByIdAndDelete({ _id: productId })
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({
            massage: "not find a product",
          });
        }
        res.json({ success: true });
      })
      .catch((err) => {
        if (err) {
          return res.status(500).json({
            massage: err,
          });
        }
      });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const getTshirt = async (req, res) => {
  try {
    const product = await ProductModel.find({ type: "Футболки" });
    const cheap = product.sort((a, b) => {
      if (a.price < b.price) {
        return 1;
      }
      if (a.price > b.price) {
        return -1;
      }
      return 0;
    });
    res.json(cheap);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const getTrousers = async (req, res) => {
  try {
    const product = await ProductModel.find({ type: "Штаны" });
    const cheap = product.sort((a, b) => {
      if (a.price < b.price) {
        return 1;
      }
      if (a.price > b.price) {
        return -1;
      }
      return 0;
    });
    res.json(cheap);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const getSneakers = async (req, res) => {
  try {
    const product = await ProductModel.find({ type: "Кроссовки" });
    const cheap = product.sort((a, b) => {
      if (a.price < b.price) {
        return 1;
      }
      if (a.price > b.price) {
        return -1;
      }
      return 0;
    });
    res.json(cheap);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const getAccessories = async (req, res) => {
  try {
    const product = await ProductModel.find({ type: "Аксессуары" });
    const cheap = product.sort((a, b) => {
      if (a.price < b.price) {
        return 1;
      }
      if (a.price > b.price) {
        return -1;
      }
      return 0;
    });
    res.json(cheap);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const getCheap = async (req, res) => {
  try {
    const product = await ProductModel.find({ type: req.body.type });

    const cheap = product.sort((a, b) => {
      if (a.price > b.price) {
        return 1;
      }
      if (a.price < b.price) {
        return -1;
      }
      return 0;
    });
    res.json(cheap);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const setComment = async (req, res) => {
  try {
    const productComment = {
      commentId: uuidv4(),
      comment: req.body.comment,
      rating: req.body.rating,
      user: req.body.user,
    };

    const newComment = await ProductModel.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $push: { comment: productComment },
      },
      {
        returnDocument: "after",
      }
    );
    res.json(newComment);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const removeComment = async (req, res) => {
  try {
    const remove = await ProductModel.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $pull: { comment: { commentId: req.body.commentId } },
      },
      {
        returnDocument: "after",
      }
    );
    res.json(remove);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
