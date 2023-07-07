import { body } from "express-validator";

export const postCreateValidator = [
  body("myFile", "добавьте фотографию").isString(),
  body("name", "добавьте имя продукта").isString(),
  body("teg", "добавьте тэг через запятую").isString(),
  body("price", "добавьте цену").isNumeric(),
  body("maxCount", "добавьте макс-количество").isNumeric(),
  body("size", "добавьте размер через запятую"),
  body("color", "добавьте цвет через запятую"),
  body("description", "добавьте описание").isString(),
];
export const registerValidator = [
  body("email", "Не верный формат почты").isEmail(),
  body("password", "Пароль должен быть минимум 6 символов").isLength({
    min: 6,
  }),
  body("userName", "Имя должен быть минимум 3 символов").isLength({ min: 3 }),
  body("avatar", "фотография слишком тяжелая").optional().isString(),
];
export const loginValidator = [
  body("email", "Не верный формат почты").isEmail(),
  body("password", "Пароль должен быть минимум 6 символов").isLength({
    min: 6,
  }),
];
