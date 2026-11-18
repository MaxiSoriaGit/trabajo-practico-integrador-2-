// * ARCHIVO A COMPLETAR
import { body } from "express-validator";
import { CategoriaModel } from "../../models/index.js";

// TODO: 1. reglas para crear un producto.
// ? - nombre: obligatorio, hasta 80 caracteres.
// ? - precio: obligatorio, número mayor a 0.
// ? - stock: opcional, entero mayor o igual a 0.
// ? - categoria_id: obligatorio, entero, y la categoría tiene que existir.
export const createProductoValidation = [
];

// TODO: 2. reglas para editar un producto: los mismos campos, pero todos opcionales.
export const updateProductoValidation = [
];
