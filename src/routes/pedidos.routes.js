// * ARCHIVO A COMPLETAR
import { Router } from "express";
import { createPedido, getPedidos } from "../controllers/pedidos.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validator } from "../middlewares/validator.middleware.js";
import { createPedidoValidation } from "../middlewares/validations/pedido.validation.js";

export const pedidoRoutes = Router();

// TODO: 1. Decidir y aplicar los middlewares que correspondan a cada ruta.

// ? Cargar un pedido: requiere sesión iniciada (vendedor o admin) y datos válidos.
pedidoRoutes.post("/pedidos", createPedido);

// ? Listar pedidos: requiere sesión iniciada (el controlador decide qué ve cada rol).
pedidoRoutes.get("/pedidos", getPedidos);
