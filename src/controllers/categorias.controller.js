// ! ARCHIVO BASE: no modificar
import { matchedData } from "express-validator";
import { CategoriaModel } from "../models/index.js";

export const getCategorias = async (_req, res) => {
  try {
    const categorias = await CategoriaModel.findAll({ order: [["nombre", "ASC"]] });
    return res.status(200).json({ data: categorias });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const createCategoria = async (req, res) => {
  try {
    const categoria = await CategoriaModel.create(matchedData(req));
    return res.status(201).json({ data: categoria });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
