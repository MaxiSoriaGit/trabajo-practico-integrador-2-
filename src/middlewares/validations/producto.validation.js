// * ARCHIVO A COMPLETAR — RESUELTO
import { body } from 'express-validator';
import { CategoriaModel } from '../../models/index.js';

// TODO: 1. reglas para crear un producto.

export const createProductoValidation = [
  // ? - nombre: obligatorio, hasta 80 caracteres.
  body('nombre')
    .trim()
    .notEmpty()
    .withMessage('El nombre es obligatorio')
    .bail()
    .isLength({ max: 80 })
    .withMessage('El nombre tiene como máximo 80 caracteres'),
  // ? - precio: obligatorio, número mayor a 0.
  body('precio')
    .notEmpty()
    .withMessage('El precio es obligatorio')
    .bail()
    .isFloat({ gt: 0 })
    .withMessage('El precio debe ser un número mayor a 0')
    .toFloat(),

  // ? - stock: opcional, entero mayor o igual a 0.
  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('El stock debe ser un entero mayor o igual a 0')
    .toInt(),

  // ? - categoria_id: obligatorio, entero, y la categoría tiene que existir.
  body('categoria_id')
    .notEmpty()
    .withMessage('La categoría es obligatoria')
    .bail()
    .isInt({ min: 1 })
    .withMessage('La categoría debe ser un id entero')
    .bail()
    .toInt()
    .custom(async (categoriaId) => {
      const categoria = await CategoriaModel.findByPk(categoriaId);
      if (!categoria) throw new Error(`La categoría ${categoriaId} no existe`);
      return true;
    }),
];

// TODO: 2. reglas para editar un producto: los mismos campos, pero todos opcionales.
export const updateProductoValidation = [
  body('nombre')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('El nombre no puede estar vacío')
    .bail()
    .isLength({ max: 80 })
    .withMessage('El nombre tiene como máximo 80 caracteres'),

  body('precio')
    .optional()
    .isFloat({ gt: 0 })
    .withMessage('El precio debe ser un número mayor a 0')
    .toFloat(),

  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('El stock debe ser un entero mayor o igual a 0')
    .toInt(),

  body('categoria_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('La categoría debe ser un id entero')
    .bail()
    .toInt()
    .custom(async (categoriaId) => {
      const categoria = await CategoriaModel.findByPk(categoriaId);
      if (!categoria) throw new Error(`La categoría ${categoriaId} no existe`);
      return true;
    }),
];
