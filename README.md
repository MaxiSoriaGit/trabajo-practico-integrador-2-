# Parte SQL – API de la Distribuidora del Norte (Base)

API REST con Node.js, Express y Sequelize/MySQL, con login por JWT en cookie.

> La teoría y el puntaje general están en [../CONSIGNA.md](../CONSIGNA.md).

## Instalación (MySQL de WAMP)

1. Iniciar WAMP y esperar a que el ícono quede en verde.
2. Crear la base `distribuidora` en phpMyAdmin (`http://localhost/phpmyadmin` → *Nueva*), o con:

   ```sql
   CREATE DATABASE distribuidora;
   ```

3. `npm install`
4. Copiar `.env.example` a `.env` (con WAMP, usuario `root` y password vacía).
5. `npm run dev`

> `sequelize.sync()` crea las tablas que falten, pero no cambia las que ya existen. Si cambiás un modelo
> después de arrancar, borrá las tablas desde phpMyAdmin (o la base entera) y volvé a levantar el servidor.

## Convención de comentarios

Instalar en VS Code la extensión **Better Comments** (Aaron Bond):

- `// !` archivos base que no se modifican.
- `// *` archivos a completar y partes ya implementadas.
- `// TODO:` tareas numeradas que se deben resolver.
- `// ?` pistas y consideraciones.

## Modelos y relaciones

| Modelo | Campos | Relación |
| --- | --- | --- |
| **Usuario** *(base)* | `username`, `email`, `password`, `role` (`vendedor` \| `admin`) | 1:1 con Perfil, 1:N con Pedido (como vendedor) |
| **Perfil** | `legajo`, `nombre`, `apellido`, `telefono`, `usuario_id` | Pertenece a un Usuario (1:1) |
| **Categoria** *(base)* | `nombre` | 1:N con Producto |
| **Producto** | `nombre`, `precio`, `stock`, `categoria_id`, eliminación lógica | Pertenece a una Categoria. N:M con Pedido |
| **Pedido** *(base)* | `cliente`, `fecha`, `estado` (`pendiente` \| `entregado` \| `cancelado`), `usuario_id` | Pertenece a un Usuario (vendedor). N:M con Producto |
| **DetallePedido** | `pedido_id`, `producto_id`, `cantidad`, `precio_unitario` | Tabla intermedia de Pedido–Producto |

Alias que usan los archivos base (tienen que coincidir): `perfil`, `usuario`, `pedidos`, `vendedor`,
`productos`, `categoria`.

## Qué hay que completar

### 1. Modelos (`src/models`)

- **perfil.model.js**: campos del perfil, incluida la FK única (TODO 1 a 4).
- **producto.model.js**: campos con sus restricciones y la eliminación lógica (TODO 1 a 5).
- **detallePedido.model.js**: clave primaria compuesta y datos del renglón (TODO 1 a 3).
- **index.js**: relaciones 1:1, 1:N y N:M (TODO 1 a 3). La relación Usuario–Pedido ya está como ejemplo.

### 2. Validaciones (`src/middlewares/validations`)

- **auth.validation.js**: registro y login (TODO 1 a 8).
- **producto.validation.js**: crear y editar (TODO 1 y 2).
- **pedido.validation.js**: cliente e items (TODO 1 a 4).

### 3. Controladores (`src/controllers`)

- **auth.controller.js**: `register`, `login` y `logout`. `getPerfil` ya está.
- **productos.controller.js**: listar (con filtro opcional), crear, editar y eliminar.
- **pedidos.controller.js**: qué traer con cada pedido, crear el pedido en una transacción y listar.

### 4. Rutas (`src/routes`)

- **auth.routes.js**, **productos.routes.js** y **pedidos.routes.js**: aplicar en cada ruta los middlewares que
  correspondan, en el orden correcto.

Mientras un controlador no esté hecho responde **501 "Falta implementar"**.

## Endpoints

| Método | Ruta | Acceso | Respuesta exitosa |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | Público | 201 + usuario con su perfil, sin password |
| POST | `/api/auth/login` | Público | 200 + cookie `token` |
| POST | `/api/auth/logout` | Sesión iniciada | 204 sin cuerpo |
| GET | `/api/auth/perfil` | Sesión iniciada | 200 + usuario con su perfil *(base)* |
| GET | `/api/categorias` | Sesión iniciada | 200 *(base)* |
| POST | `/api/categorias` | admin | 201 *(base)* |
| GET | `/api/productos` | Sesión iniciada | 200 + productos con su categoría. Acepta `?categoria_id=` |
| POST | `/api/productos` | admin | 201 + producto con su categoría |
| PUT | `/api/productos/:id` | admin | 200 + producto actualizado con su categoría |
| DELETE | `/api/productos/:id` | admin | 204, eliminación lógica |
| POST | `/api/pedidos` | Sesión iniciada | 201 + pedido con vendedor y productos |
| GET | `/api/pedidos` | Sesión iniciada | 200. El admin ve todos; el vendedor, solo los suyos |

## Reglas de negocio

- El **vendedor** de un pedido es el usuario logueado; no viene en el body.
- Al cargar un pedido se guarda en `precio_unitario` el **precio actual** del producto y se descuenta el stock.
- Si algún producto no tiene stock suficiente, **no se guarda nada** (ni el pedido ni los otros renglones ni los
  descuentos de stock) y se responde 400 diciendo qué producto falta.
- Un producto eliminado no aparece en el listado ni se puede vender, pero los pedidos viejos lo siguen mostrando.
- Errores de validación: **400** con `{ errors: ... }`. Sin sesión: **401**. Sin permisos: **403**. Inexistente: **404**.

## Ejemplos de body

**Registro**

```json
{
  "username": "lgauna",
  "email": "laura.gauna@distribuidora.com",
  "password": "12345678",
  "role": "vendedor",
  "perfil": { "legajo": "V-002", "nombre": "Laura", "apellido": "Gauna", "telefono": "3704123456" }
}
```

**Crear pedido**

```json
{
  "cliente": "Almacén Don Pepe",
  "items": [
    { "producto_id": 1, "cantidad": 3 },
    { "producto_id": 2, "cantidad": 10 }
  ]
}
```

## Postman

Importar `Examen-SQL.postman_collection.json` y ejecutarla de arriba hacia abajo (*Run collection*). Las cookies
del login se guardan solas y las variables (`categoriaId`, `productoId`...) se completan solas. Se puede repetir
las veces que quieras: cada recorrido usa nombres nuevos.

## Puntaje de esta parte (40 puntos)

| Parte | Puntos |
| --- | --- |
| Modelos | 8 |
| Relaciones (`index.js`) | 6 |
| Validaciones | 8 |
| Controladores de auth | 3 |
| Controladores de productos | 4 |
| Controladores de pedidos (con transacción) | 7 |
| Rutas con middlewares correctos | 4 |
