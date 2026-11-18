// * ARCHIVO A COMPLETAR — RESUELTO
import { matchedData } from 'express-validator';
import { sequelize } from '../config/db.js';
import {
  PedidoModel,
  ProductoModel,
  DetallePedidoModel,
  UsuarioModel,
} from '../models/index.js';

// TODO: 1. qué se trae junto con cada pedido (lo usan createPedido y getPedidos):
// ? - el vendedor: solo id y username
// ? - los productos: solo id y nombre, y de la tabla intermedia solo cantidad y precio_unitario
// ? - también los productos eliminados lógicamente (si no, un pedido viejo perdería renglones)
const incluirDetalle = [
  { model: UsuarioModel, as: 'vendedor', attributes: ['id', 'username'] },
  {
    model: ProductoModel,
    as: 'productos',
    attributes: ['id', 'nombre'],
    through: { attributes: ['cantidad', 'precio_unitario'] },
    paranoid: false,
  },
];

export const createPedido = async (req, res) => {
  // TODO: 2. registrar el pedido dentro de una transacción.
  // ? - El vendedor es el usuario logueado; el estado y la fecha toman su valor por defecto.
  // ? - Por cada item: si no hay stock suficiente, deshacer todo y responder 400 diciendo qué producto falta.
  // ? - Guardar cada renglón en detalle_pedido con el precio ACTUAL del producto como precio_unitario.
  // ? - Descontar el stock de cada producto.
  // ? - Responder 201 con el pedido completo (usar incluirDetalle).
  const { cliente, items } = matchedData(req);
  const t = await sequelize.transaction();

  try {
    const pedido = await PedidoModel.create(
      { cliente, usuario_id: req.user.id },
      { transaction: t },
    );

    for (const item of items) {
      const producto = await ProductoModel.findByPk(item.producto_id, {
        transaction: t,
      });

      if (producto.stock < item.cantidad) {
        await t.rollback();
        return res.status(400).json({
          msg: `No hay stock suficiente de ${producto.nombre} (quedan ${producto.stock})`,
        });
      }

      await DetallePedidoModel.create(
        {
          pedido_id: pedido.id,
          producto_id: producto.id,
          cantidad: item.cantidad,
          precio_unitario: producto.precio,
        },
        { transaction: t },
      );

      await producto.decrement('stock', { by: item.cantidad, transaction: t });
    }

    await t.commit();

    const pedidoCompleto = await PedidoModel.findByPk(pedido.id, {
      include: incluirDetalle,
    });
    return res.status(201).json({ data: pedidoCompleto });
  } catch (error) {
    console.log(error);
    // Si el error pasó antes del commit, se deshace todo lo que se hizo en la transacción
    if (!t.finished) await t.rollback();
    return res.status(500).json({ msg: 'Error interno del servidor' });
  }
};

export const getPedidos = async (req, res) => {
  try {
    // TODO: 3. el admin ve todos los pedidos; un vendedor, solo los que cargó él.
    // ? Con incluirDetalle, del más nuevo al más viejo.
    const where = req.user.role === 'admin' ? {} : { usuario_id: req.user.id };

    const pedidos = await PedidoModel.findAll({
      where,
      include: incluirDetalle,
      order: [
        ['fecha', 'DESC'],
        ['id', 'DESC'],
      ],
    });

    return res.status(200).json({ data: pedidos });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Error interno del servidor' });
  }
};
