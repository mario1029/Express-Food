import { validationResult } from 'express-validator';
import { check } from 'express-validator';
import { exists } from 'fs';

export const signUpFieldsValidation = [
  check('nombre').notEmpty({ ignore_whitespace: true }).withMessage('Es necesario un alias').isString().isLength({min:4}).withMessage('Alias invalido, de tener por lo menos 4 caracteres'),
  check('correo').notEmpty({ ignore_whitespace: true }).withMessage('Falta un correo').isEmail().withMessage('Correo invalido'),
  check('direccion').notEmpty({ ignore_whitespace: true }).withMessage('Es necesario una direccion').isString().withMessage('Direccion invalida'),
  check('numero').optional().isString().withMessage('numero invalido'),
  check('contrasenia').notEmpty({ ignore_whitespace: true }).withMessage('Falta una contraseña').isLength({min:4, max:20}).withMessage('Contrasenia invalida, debe tener una longitud de 4 a 20 caracteres'),
];

export const updateUserFieldsValidation = [
  check('nombre').notEmpty({ ignore_whitespace: true }).withMessage('Es necesario un alias').isString().isLength({min:4}).withMessage('Alias invalido, de tener por lo menos 4 caracteres'),
  check('correo').notEmpty({ ignore_whitespace: true }).withMessage('Falta un correo').isEmail().withMessage('Correo invalido'),
  check('direccion').notEmpty({ ignore_whitespace: true }).withMessage('Es necesario una direccion').isString().withMessage('Direccion invalido, de tener por lo menos 4 caracteres'),
  check('numero').optional().isEmail().withMessage('numero invalido'),
];

export const loginFieldsValidation = [
  check('correo').notEmpty({ ignore_whitespace: true }).withMessage('Falta un correo').isEmail().withMessage('Correo invalido'),
  check('contrasenia').notEmpty({ ignore_whitespace: true }).withMessage('Falta una contraseña').isLength({min:4, max:20}).withMessage('Contrasenia invalida, debe tener una longitud de 4 a 20 caracteres')
];

export const premisessValidation = [
  check('nombre').notEmpty({ ignore_whitespace: true }).withMessage('Es necesario un nombre para la tienda').isString().withMessage('nombre invalido'),
  check('correoE').notEmpty({ ignore_whitespace: true }).withMessage('Falta un correo').isEmail().withMessage('Correo invalido'),
  check('direccion').notEmpty({ ignore_whitespace: true }).withMessage('Es necesario una direccion').isString().withMessage('Direccion invalido, de tener por lo menos 4 caracteres'),
  check('numeroContacto').optional().isString().withMessage('numero invalido'),
  check('urlPagina').optional().isString().withMessage('URL invalida'),  
];

export const productValidation = [
  check('nombre').notEmpty({ ignore_whitespace: true }).withMessage('Es necesario un nombre para el producto').isString().withMessage('nombre invalido'),
  check('descripcion').notEmpty({ ignore_whitespace: true }).withMessage('Falta una descripcion').isEmail().isLength({min:4, max:100}).withMessage('descripcion invalida'),
  check('precio').notEmpty({ ignore_whitespace: true }).withMessage('Es necesario un monto').isNumeric().withMessage('Monto invalido'),
]

export const checkResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      status: 400,
      message: 'Error en datos enviados',
      error: errors.array()[0],
    });
  } else {
    next();
  }
};
