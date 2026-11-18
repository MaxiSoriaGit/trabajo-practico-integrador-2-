// * ARCHIVO A COMPLETAR
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

// ? Datos personales del usuario, en su propia tabla (relación 1:1, ver index.js).
export const PerfilModel = sequelize.define(
  "Perfil",
  {
    // TODO: 1. legajo: texto de hasta 10 caracteres, obligatorio y único.
    // TODO: 2. nombre y apellido: texto de hasta 50 caracteres, obligatorios.
    // TODO: 3. telefono: texto de hasta 20 caracteres, opcional.
    // TODO: 4. usuario_id: entero, obligatorio y único.
    // ? El unique es lo que garantiza que un usuario no pueda tener dos perfiles.
  },
  { timestamps: false }
);
