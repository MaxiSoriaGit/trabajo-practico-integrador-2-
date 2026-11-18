// ! ARCHIVO BASE: no modificar
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const UsuarioModel = sequelize.define("Usuario", {
  username: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("vendedor", "admin"),
    allowNull: false,
    defaultValue: "vendedor",
  },
});
