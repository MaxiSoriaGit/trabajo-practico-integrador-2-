// * ARCHIVO A COMPLETAR
import { UsuarioModel } from "./usuario.model.js";
import { PerfilModel } from "./perfil.model.js";
import { CategoriaModel } from "./categoria.model.js";
import { ProductoModel } from "./producto.model.js";
import { PedidoModel } from "./pedido.model.js";
import { DetallePedidoModel } from "./detallePedido.model.js";

// * Ya resuelto, como ejemplo. 1:N: un usuario (vendedor) carga muchos pedidos.
UsuarioModel.hasMany(PedidoModel, { foreignKey: "usuario_id", as: "pedidos" });
PedidoModel.belongsTo(UsuarioModel, { foreignKey: "usuario_id", as: "vendedor" });

// TODO: 1. 1:1 entre usuario y perfil, con la clave foránea usuario_id.
// ? Alias "perfil" desde usuario y "usuario" desde perfil. Si se borra el usuario, se borra su perfil.

// TODO: 2. 1:N entre categoría y producto, con la clave foránea categoria_id.
// ? Alias "productos" desde categoría y "categoria" desde producto.

// TODO: 3. N:M entre pedido y producto, a través de DetallePedidoModel (pedido_id / producto_id).
// ? Alias "productos" desde pedido y "pedidos" desde producto.

export {
  UsuarioModel,
  PerfilModel,
  CategoriaModel,
  ProductoModel,
  PedidoModel,
  DetallePedidoModel,
};
