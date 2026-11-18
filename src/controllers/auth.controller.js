// * ARCHIVO A COMPLETAR
import { matchedData } from "express-validator";
import { UsuarioModel, PerfilModel } from "../models/index.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import { signToken } from "../helpers/jwt.helper.js";

export const register = async (req, res) => {
  try {
    const data = matchedData(req);

    // TODO: 1. Hashear la password antes de guardarla (hashPassword).

    // TODO: 2. Crear el usuario y su perfil en una sola operación (create con include, alias "perfil").

    // TODO: 3. Responder con código 201, un mensaje de éxito y el usuario con su perfil, sin la password.
    return res.status(501).json({ msg: "Falta implementar" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = matchedData(req);

    // TODO: 1. Buscar el usuario por email y comparar la password (comparePassword). Si no coincide, 401.
    // TODO: 2. Firmar un JWT con el id y el role del usuario (signToken).
    // TODO: 3. Guardar el token en una cookie httpOnly llamada "token" y responder con código 200 y un mensaje de éxito.
    return res.status(501).json({ msg: "Falta implementar" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const logout = async (_req, res) => {
  try {
    // TODO: 1. Eliminar la cookie "token" y responder con código 204 sin devolver ningún mensaje.
    return res.status(501).json({ msg: "Falta implementar" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

// * Ya implementado: usa el alias "perfil" de la relación 1:1 (index.js)
export const getPerfil = async (req, res) => {
  try {
    const usuario = await UsuarioModel.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
      include: [{ model: PerfilModel, as: "perfil" }],
    });

    if (!usuario) return res.status(404).json({ msg: "Usuario no encontrado" });

    return res.status(200).json({ data: usuario });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
