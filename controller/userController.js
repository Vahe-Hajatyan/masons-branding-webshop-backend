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
