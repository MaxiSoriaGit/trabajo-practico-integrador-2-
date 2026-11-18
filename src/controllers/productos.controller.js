// * ARCHIVO A COMPLETAR — RESUELTO
import { matchedData } from 'express-validator';
import { ProductoModel, CategoriaModel } from '../models/index.js';

export const getProductos = async (req, res) => {
  try {
    // TODO: 1. listar los productos con su categoría (solo id y nombre), ordenados por nombre.
    // ? Si llega ?categoria_id=2 en la URL, devolver solo los de esa categoría.
    const where = {};
    if (req.query.categoria_id) where.categoria_id = req.query.categoria_id;

    const productos = await ProductoModel.findAll({
      where,
      include: [
        {
          model: CategoriaModel,
          as: 'categoria',
          attributes: ['id', 'nombre'],
        },
      ],
      order: [['nombre', 'ASC']],
    });

    return res.status(200).json({ data: productos });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Error interno del servidor' });
  }
};

export const createProducto = async (req, res) => {
  try {
    // TODO: 2. crear el producto con los datos validados. Responder 201 con el producto y su categoría.
    const producto = await ProductoModel.create(matchedData(req));
    await producto.reload({
      include: [
        {
          model: CategoriaModel,
          as: 'categoria',
          attributes: ['id', 'nombre'],
        },
      ],
    });

    return res.status(201).json({ data: producto });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Error interno del servidor' });
  }
};

export const updateProducto = async (req, res) => {
  try {
    // TODO: 3. si el producto no existe, 404 (un producto eliminado cuenta como inexistente).
    // ? Si existe, actualizarlo con los datos validados y responder 200 con el producto y su categoría.
    const producto = await ProductoModel.findByPk(req.params.id);
    if (!producto)
      return res.status(404).json({ msg: 'Producto no encontrado' });

    await producto.update(matchedData(req));
    await producto.reload({
      include: [
        {
          model: CategoriaModel,
          as: 'categoria',
          attributes: ['id', 'nombre'],
        },
      ],
    });

    return res.status(200).json({ data: producto });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Error interno del servidor' });
  }
};

export const deleteProducto = async (req, res) => {
  try {
    // TODO: 4. si el producto no existe, 404. Si existe, eliminarlo (lógicamente) y responder 204.
    const producto = await ProductoModel.findByPk(req.params.id);
    if (!producto)
      return res.status(404).json({ msg: 'Producto no encontrado' });

    // Con paranoid, destroy() no borra la fila: completa deletedAt
    await producto.destroy();

    return res.status(204).send();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Error interno del servidor' });
  }
};
