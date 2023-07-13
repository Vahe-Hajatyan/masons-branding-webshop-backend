import UserModel from "../module/User.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const Password = req.body.password;
    const Sale = await bcrypt.genSalt(10);
    const Hash = await bcrypt.hash(Password, Sale);
    const doc = new UserModel({
      userName: req.body.userName,
      email: req.body.email,
      password: Hash,
      avatar: req.body.avatar,
    });
    const user = await doc.save();
    const token = jwt.sign(
      {
        _id: user._id,
      },
      "pass123",
      {
        expiresIn: "30d",
      }
    );
    const { password, ...userInfo } = user._doc;

    res.json({ ...userInfo, token });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        message: "user not find",
      });
    }
    const isValidPas = await bcrypt.compare(
      req.body.password,
      user._doc.password
    );

    if (!isValidPas) {
      return res.status(400).json({
        message: "wrong login or password",
      });
    }
    const token = jwt.sign(
      {
        _id: user._id,
      },
      "pass123",
      {
        expiresIn: "30d",
      }
    );
    const { password, ...userInfo } = user._doc;

    res.json({ ...userInfo, token });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const me = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "user not find",
      });
    }
    const { password, ...userInfo } = user._doc;

    res.json(userInfo);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const setBasket = async (req, res) => {
  try {
    const isProduct = {
      id: req.body.id,
      price: req.body.price,
      maxCount: req.body.maxCount,
      name: req.body.name,
      teg: req.body.teg,
      size: req.body.size,
      color: req.body.color,
      myFile: req.body.myFile,
    };
    const newProductInBasket = await UserModel.findByIdAndUpdate(
      {
        _id: req.userId,
      },
      {
        $push: { basket: isProduct },
      },
      {
        returnDocument: "after",
      }
    );
    res.json(newProductInBasket);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const removeBasket = async (req, res) => {
  try {
    const remove = await UserModel.findByIdAndUpdate(
      {
        _id: req.userId,
      },
      {
        $pull: { basket: { id: req.body.id } },
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
export const setFavorite = async (req, res) => {
  try {
    const product = {
      id: req.body.id,
      name: req.body.name,
      price: req.body.price,
      myFile: req.body.myFile,
    };
    const setFav = await UserModel.findByIdAndUpdate(
      {
        _id: req.userId,
      },
      {
        $push: { favorite: product },
      },
      {
        returnDocument: "after",
      }
    );
    res.json(setFav);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const removeFavorite = async (req, res) => {
  try {
    const removeFav = await UserModel.findByIdAndUpdate(
      {
        _id: req.userId,
      },
      {
        $pull: { favorite: { id: req.body.id } },
      },
      {
        returnDocument: "after",
      }
    );
    res.json(removeFav);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
