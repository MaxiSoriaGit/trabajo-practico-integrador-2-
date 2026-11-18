// * ARCHIVO A COMPLETAR
import { body } from "express-validator";
import { ProductoModel } from "../../models/index.js";

// ? Body esperado: { "cliente": "Almacén Don Pepe", "items": [{ "producto_id": 1, "cantidad": 5 }] }
export const createPedidoValidation = [
  // TODO: 1. cliente: obligatorio, hasta 100 caracteres.

  // TODO: 2. items: arreglo con al menos un elemento y sin productos repetidos.

  // TODO: 3. items.*.producto_id: entero, y el producto tiene que existir.
  // ? Un producto eliminado (lógicamente) no se puede vender.

  // TODO: 4. items.*.cantidad: entero mayor o igual a 1.
];
