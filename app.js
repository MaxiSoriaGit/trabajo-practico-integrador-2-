// ! ARCHIVO BASE: no modificar
import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./src/config/db.js";
import "./src/models/index.js";
import { authRoutes } from "./src/routes/auth.routes.js";
import { categoriaRoutes } from "./src/routes/categorias.routes.js";
import { productoRoutes } from "./src/routes/productos.routes.js";
import { pedidoRoutes } from "./src/routes/pedidos.routes.js";

const app = express();
const PORT = process.env.PORT;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", categoriaRoutes);
app.use("/api", productoRoutes);
app.use("/api", pedidoRoutes);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
