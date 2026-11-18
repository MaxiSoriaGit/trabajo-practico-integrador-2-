// * ARCHIVO A COMPLETAR
import { Router } from "express";
import {
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto,
} from "../controllers/productos.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { validator } from "../middlewares/validator.middleware.js";
import {
  createProductoValidation,
  updateProductoValidation,
} from "../middlewares/validations/producto.validation.js";

export const productoRoutes = Router();

// TODO: 1. Decidir y aplicar los middlewares que correspondan a cada ruta.

// ? Listar productos: requiere sesión iniciada.
productoRoutes.get("/productos", getProductos);

// ? Crear un producto: solo admin y con datos válidos.
productoRoutes.post("/productos", createProducto);

// ? Editar un producto: solo admin y con datos válidos.
productoRoutes.put("/productos/:id", updateProducto);

// ? Eliminar un producto: solo admin.
productoRoutes.delete("/productos/:id", deleteProducto);
