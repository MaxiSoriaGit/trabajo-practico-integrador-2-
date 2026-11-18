import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const DetallePedidoModel = sequelize.define(
  'DetallePedido',
  {
    // TODO: 1. pedido_id y producto_id: enteros obligatorios. Entre los dos forman la clave primaria.
    pedido_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    // TODO: 2. cantidad: entero, obligatorio, como mínimo 1.
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    // TODO: 3. precio_unitario: decimal de 10 dígitos con 2 decimales, obligatorio.
    precio_unitario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: 'detalle_pedidos', // Opcional, por si la consigna pide nombre exacto de tabla
  },
);
