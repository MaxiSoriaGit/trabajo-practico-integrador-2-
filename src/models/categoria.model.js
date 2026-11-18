// ! ARCHIVO BASE: no modificar
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const CategoriaModel = sequelize.define(
  "Categoria",
  {
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
  },
  { timestamps: false }
);
