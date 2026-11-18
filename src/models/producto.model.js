// * ARCHIVO A COMPLETAR
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const ProductoModel = sequelize.define(
  'Producto',
  {
    // TODO: 1. nombre: texto de hasta 80 caracteres, obligatorio.
    nombre: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    // TODO: 2. precio: decimal de 10 dígitos con 2 decimales, obligatorio y mayor a 0.
    // ? MySQL devuelve los DECIMAL como texto ("4200.00"): para hacer cuentas usá Number(...).
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: { min: 0.01 },
    },
    // TODO: 3. stock: entero, obligatorio, no puede ser negativo y por defecto es 0.
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 0 },
    },
    // TODO: 4. categoria_id: entero, obligatorio.
    categoria_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    // TODO: 5. eliminación lógica: al borrar un producto no se borra la fila, se completa la fecha de borrado.
    paranoid: true,
  },
);
