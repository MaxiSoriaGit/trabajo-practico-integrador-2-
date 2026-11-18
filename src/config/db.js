// ! ARCHIVO BASE: no modificar
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
    // ? La tabla se llama igual que el modelo (Perfil, no Perfils)
    define: { freezeTableName: true },
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Conectado a la base de datos");
  } catch (error) {
    console.log("Error al conectarse a la base de datos:", error);
  }
};
