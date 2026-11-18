// * ARCHIVO A COMPLETAR
import { body } from "express-validator";
import { UsuarioModel, PerfilModel } from "../../models/index.js";

export const registerValidation = [
  // TODO: 1. Validar username: obligatorio, entre 3 y 30 caracteres y único (UsuarioModel).

  // TODO: 2. Validar email: obligatorio, con formato válido y único.

  // TODO: 3. Validar password: obligatoria, con mínimo de 8 caracteres.

  // TODO: 4. Validar role: opcional y limitado a los roles permitidos ("vendedor" o "admin").

  // TODO: 5. Validar perfil.legajo: obligatorio, hasta 10 caracteres y único (PerfilModel).

  // TODO: 6. Validar perfil.nombre y perfil.apellido como obligatorios, y perfil.telefono como opcional.
];

export const loginValidation = [
  // TODO: 7. Validar email: obligatorio y con formato válido.

  // TODO: 8. Validar password: obligatoria.
];
