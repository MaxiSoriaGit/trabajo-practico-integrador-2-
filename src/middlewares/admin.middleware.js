// ! ARCHIVO BASE: no modificar
// ? Va siempre después de authMiddleware, que es el que carga req.user
export const adminMiddleware = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ msg: "Solo para administradores" });
  }
  next();
};
