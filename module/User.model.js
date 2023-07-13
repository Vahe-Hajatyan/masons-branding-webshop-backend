import mongoose, { mongo } from "mongoose";

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  basket: {
    type: [Object],
  },
  favorite: {
    type: [Object],
  },
});
export default mongoose.model("User", userSchema);
