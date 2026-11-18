// * ARCHIVO A COMPLETAR
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

// ? Tabla intermedia de la relación N:M entre pedido y producto.
// ? Además de las dos claves foráneas guarda datos propios de cada renglón del pedido.
export const DetallePedidoModel = sequelize.define(
  "DetallePedido",
  {
    // TODO: 1. pedido_id y producto_id: enteros obligatorios. Entre los dos forman la clave primaria.
    // TODO: 2. cantidad: entero, obligatorio, como mínimo 1.
    // TODO: 3. precio_unitario: decimal de 10 dígitos con 2 decimales, obligatorio.
    // ? Es el precio del producto en el momento de la venta (ver reglas de negocio).
  },
  { timestamps: false }
);
