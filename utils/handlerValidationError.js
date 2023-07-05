import { validationResult } from "express-validator";
// error checking
export const handlerValidationError = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json(error.array());
  }
  next();
};
