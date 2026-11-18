// * ARCHIVO A COMPLETAR
import { matchedData } from "express-validator";
import { ProductoModel, CategoriaModel } from "../models/index.js";

export const getProductos = async (req, res) => {
  try {
    // TODO: 1. listar los productos con su categoría (solo id y nombre), ordenados por nombre.
    // ? Si llega ?categoria_id=2 en la URL, devolver solo los de esa categoría.
    return res.status(501).json({ msg: "Falta implementar" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const createProducto = async (req, res) => {
  try {
    // TODO: 2. crear el producto con los datos validados. Responder 201 con el producto y su categoría.
    return res.status(501).json({ msg: "Falta implementar" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const updateProducto = async (req, res) => {
  try {
    // TODO: 3. si el producto no existe, 404 (un producto eliminado cuenta como inexistente).
    // ? Si existe, actualizarlo con los datos validados y responder 200 con el producto y su categoría.
    return res.status(501).json({ msg: "Falta implementar" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteProducto = async (req, res) => {
  try {
    // TODO: 4. si el producto no existe, 404. Si existe, eliminarlo (lógicamente) y responder 204.
    return res.status(501).json({ msg: "Falta implementar" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
