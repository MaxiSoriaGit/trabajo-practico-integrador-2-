// * ARCHIVO A COMPLETAR — RESUELTO
import { body } from 'express-validator';
import { ProductoModel } from '../../models/index.js';

// ? Body esperado: { "cliente": "Almacén Don Pepe", "items": [{ "producto_id": 1, "cantidad": 5 }] }
export const createPedidoValidation = [
  // TODO: 1. cliente: obligatorio, hasta 100 caracteres.
  body('cliente')
    .trim()
    .notEmpty()
    .withMessage('El cliente es obligatorio')
    .bail()
    .isLength({ max: 100 })
    .withMessage('El cliente tiene como máximo 100 caracteres'),

  // TODO: 2. items: arreglo con al menos un elemento y sin productos repetidos.
  body('items')
    .isArray({ min: 1 })
    .withMessage('items debe ser un arreglo con al menos un producto')
    .bail()
    .custom((items) => {
      const ids = items.map((item) => Number(item.producto_id));
      if (new Set(ids).size !== ids.length) {
        throw new Error('Hay productos repetidos en el pedido');
      }
      return true;
    }),

  // TODO: 3. items.*.producto_id: entero, y el producto tiene que existir.
  // ? Un producto eliminado (lógicamente) no se puede vender.
  body('items.*.producto_id')
    .isInt({ min: 1 })
    .withMessage('Cada producto_id debe ser un entero')
    .bail()
    .toInt()
    .custom(async (productoId) => {
      // findByPk no encuentra los productos eliminados con paranoid
      const producto = await ProductoModel.findByPk(productoId);
      if (!producto) throw new Error(`El producto ${productoId} no existe`);
      return true;
    }),

  // TODO: 4. items.*.cantidad: entero mayor o igual a 1.
  body('items.*.cantidad')
    .isInt({ min: 1 })
    .withMessage('Cada cantidad debe ser un entero mayor o igual a 1')
    .toInt(),
];
