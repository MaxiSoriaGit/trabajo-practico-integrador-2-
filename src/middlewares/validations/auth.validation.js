// * ARCHIVO A COMPLETAR
import { body } from 'express-validator';
import { UsuarioModel, PerfilModel } from '../../models/index.js';

export const registerValidation = [
  // TODO: 1. Validar username: obligatorio, entre 3 y 30 caracteres y único (UsuarioModel).
  body('username')
    .trim()
    .notEmpty()
    .withMessage('El username es obligatorio')
    .isLength({ min: 3, max: 30 })
    .withMessage('El username debe tener entre 3 y 30 caracteres')
    .bail()
    .custom(async (username) => {
      const existe = await UsuarioModel.findOne({ where: { username } });
      if (existe) throw new Error('Ese username ya está en uso');
    }),

  // TODO: 2. Validar email: obligatorio, con formato válido y único.
  body('email')
    .trim()
    .notEmpty()
    .withMessage('El email es obligatorio')
    .isEmail()
    .withMessage('El email no es válido')
    .normalizeEmail()
    .bail()
    .custom(async (email) => {
      const existe = await UsuarioModel.findOne({ where: { email } });
      if (existe) throw new Error('Ya existe un usuario con ese email');
    }),

  // TODO: 3. Validar password: obligatoria, con mínimo de 8 caracteres.
  body('password')
    .notEmpty()
    .withMessage('La contraseña es obligatoria')
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener mínimo 8 caracteres'),

  // TODO: 4. Validar role: opcional y limitado a los roles permitidos ("vendedor" o "admin").
  body('role')
    .optional()
    .isIn(['vendedor', 'admin'])
    .withMessage("El rol debe ser 'vendedor' o 'admin'"),

  // TODO: 5. Validar perfil.legajo: obligatorio, hasta 10 caracteres y único (PerfilModel).
  body('perfil.legajo')
    .trim()
    .notEmpty()
    .withMessage('El legajo es obligatorio')
    .isLength({ max: 10 })
    .withMessage('El legajo puede tener hasta 10 caracteres')
    .bail()
    .custom(async (legajo) => {
      const existe = await PerfilModel.findOne({ where: { legajo } });
      if (existe) throw new Error('Ese legajo ya está registrado');
    }),

  // TODO: 6. Validar perfil.nombre y perfil.apellido como obligatorios, y perfil.telefono como opcional.
  body('perfil.nombre')
    .trim()
    .notEmpty()
    .withMessage('El nombre es obligatorio'),
  body('perfil.apellido')
    .trim()
    .notEmpty()
    .withMessage('El apellido es obligatorio'),
  body('perfil.telefono').optional({ values: 'falsy' }).trim(),
];

export const loginValidation = [
  // TODO: 7. Validar email: obligatorio y con formato válido.
  body('email')
    .trim()
    .notEmpty()
    .withMessage('El email es obligatorio')
    .isEmail()
    .withMessage('El email no es válido'),

  // TODO: 8. Validar password: obligatoria.
  body('password').notEmpty().withMessage('La contraseña es obligatoria'),
];
