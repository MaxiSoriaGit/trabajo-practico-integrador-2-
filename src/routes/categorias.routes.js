// ! ARCHIVO BASE: no modificar
import { Router } from "express";
import { getCategorias, createCategoria } from "../controllers/categorias.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { validator } from "../middlewares/validator.middleware.js";
import { createCategoriaValidation } from "../middlewares/validations/categoria.validation.js";

export const categoriaRoutes = Router();

categoriaRoutes.get("/categorias", authMiddleware, getCategorias);

categoriaRoutes.post(
  "/categorias",
  authMiddleware,
  adminMiddleware,
  createCategoriaValidation,
  validator,
  createCategoria
);
