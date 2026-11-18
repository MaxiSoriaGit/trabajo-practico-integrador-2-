// ! ARCHIVO BASE: no modificar
import { verifyToken } from "../helpers/jwt.helper.js";

// ? Deja en req.user el contenido del token: { id, role }
export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ msg: "No autorizado" });
    req.user = verifyToken(token);
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ msg: "Token inválido" });
  }
};
