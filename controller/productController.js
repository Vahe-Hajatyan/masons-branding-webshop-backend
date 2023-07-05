import ProductModel from "../module/Product.model.js";

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
export const getTshirt = async (req, res) => {
  try {
    const product = await ProductModel.find({ type: "Футболки" });
    res.json(product);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const getTrousers = async (req, res) => {
  try {
    const product = await ProductModel.find({ type: "Штаны" });
    res.json(product);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const getSneakers = async (req, res) => {
  try {
    const product = await ProductModel.find({ type: "Кроссовки" });
    res.json(product);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const getAccessories = async (req, res) => {
  try {
    const product = await ProductModel.find({ type: "Аксессуары" });
    res.json(product);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const getOne = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
