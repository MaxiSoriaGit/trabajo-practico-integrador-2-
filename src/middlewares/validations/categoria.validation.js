// ! ARCHIVO BASE: no modificar
import { body } from "express-validator";
import { CategoriaModel } from "../../models/index.js";

export const createCategoriaValidation = [
  body("nombre")
    .trim()
    .notEmpty().withMessage("El nombre es obligatorio").bail()
    .isLength({ max: 50 }).withMessage("El nombre tiene como máximo 50 caracteres").bail()
    .custom(async (nombre) => {
      const found = await CategoriaModel.findOne({ where: { nombre } });
      if (found) throw new Error("Ya existe una categoría con ese nombre");
      return true;
    }),
];
