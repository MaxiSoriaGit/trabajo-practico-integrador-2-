// * ARCHIVO A COMPLETAR
import { matchedData } from "express-validator";
import { sequelize } from "../config/db.js";
import {
  PedidoModel,
  ProductoModel,
  DetallePedidoModel,
  UsuarioModel,
} from "../models/index.js";

// TODO: 1. qué se trae junto con cada pedido (lo usan createPedido y getPedidos):
// ? - el vendedor: solo id y username
// ? - los productos: solo id y nombre, y de la tabla intermedia solo cantidad y precio_unitario
// ? - también los productos eliminados lógicamente (si no, un pedido viejo perdería renglones)
const incluirDetalle = [
];

export const createPedido = async (req, res) => {
  // TODO: 2. registrar el pedido dentro de una transacción.
  // ? - El vendedor es el usuario logueado; el estado y la fecha toman su valor por defecto.
  // ? - Por cada item: si no hay stock suficiente, deshacer todo y responder 400 diciendo qué producto falta.
  // ? - Guardar cada renglón en detalle_pedido con el precio ACTUAL del producto como precio_unitario.
  // ? - Descontar el stock de cada producto.
  // ? - Responder 201 con el pedido completo (usar incluirDetalle).
  return res.status(501).json({ msg: "Falta implementar" });
};

export const getPedidos = async (req, res) => {
  try {
    // TODO: 3. el admin ve todos los pedidos; un vendedor, solo los que cargó él.
    // ? Con incluirDetalle, del más nuevo al más viejo.
    return res.status(501).json({ msg: "Falta implementar" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
