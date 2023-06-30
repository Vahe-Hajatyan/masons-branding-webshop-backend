import { body } from "express-validator";

export const postCreateValidator = [
  body("myFile", "добавьте фотографию").isString(),
  body("name", "добавьте имя продукта").isString(),
  body("name", "добавьте имя продукта").isString(),
  body("tag", "добавьте тэг через запятую").isString(),
  body("price", "добавьте цену").isNumeric(),
  body("maxCount", "добавьте макс-количество").isNumeric(),
  body("size", "добавьте размер через запятую"),
  body("color", "добавьте цвет через запятую"),
  body("description", "добавьте описание").isString(),
];
