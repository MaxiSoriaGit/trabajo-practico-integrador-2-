// ! ARCHIVO BASE: no modificar
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const PedidoModel = sequelize.define("Pedido", {
  cliente: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  estado: {
    type: DataTypes.ENUM("pendiente", "entregado", "cancelado"),
    allowNull: false,
    defaultValue: "pendiente",
  },
  // ? Vendedor que cargó el pedido (relación 1:N con usuario, ver index.js)
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
