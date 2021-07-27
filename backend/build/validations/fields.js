"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkResult = exports.updateProductValidation = exports.productValidation = exports.premisessValidation = exports.loginFieldsValidation = exports.updateUserFieldsValidation = exports.signUpFieldsValidation = void 0;
const express_validator_1 = require("express-validator");
const express_validator_2 = require("express-validator");
exports.signUpFieldsValidation = [
    express_validator_2.check('nombre').notEmpty({ ignore_whitespace: true }).withMessage('Es necesario un alias').isString().isLength({ min: 4 }).withMessage('Alias invalido, de tener por lo menos 4 caracteres'),
    express_validator_2.check('correo').notEmpty({ ignore_whitespace: true }).withMessage('Falta un correo').isEmail().withMessage('Correo invalido'),
    express_validator_2.check('direccion').notEmpty({ ignore_whitespace: true }).withMessage('Es necesario una direccion').isString().withMessage('Direccion invalida'),
    express_validator_2.check('numero').optional().isString().withMessage('numero invalido'),
    express_validator_2.check('contrasenia').notEmpty({ ignore_whitespace: true }).withMessage('Falta una contraseña').isLength({ min: 4, max: 20 }).withMessage('Contrasenia invalida, debe tener una longitud de 4 a 20 caracteres'),
];
exports.updateUserFieldsValidation = [
    express_validator_2.check('nombre').notEmpty({ ignore_whitespace: true }).withMessage('Es necesario un alias').isString().isLength({ min: 4 }).withMessage('Alias invalido, de tener por lo menos 4 caracteres'),
    express_validator_2.check('correo').notEmpty({ ignore_whitespace: true }).withMessage('Falta un correo').isEmail().withMessage('Correo invalido'),
    express_validator_2.check('direccion').notEmpty({ ignore_whitespace: true }).withMessage('Es necesario una direccion').isString().withMessage('Direccion invalido, de tener por lo menos 4 caracteres'),
    express_validator_2.check('numero').optional().isEmail().withMessage('numero invalido'),
];
exports.loginFieldsValidation = [
    express_validator_2.check('correo').notEmpty({ ignore_whitespace: true }).withMessage('Falta un correo').isEmail().withMessage('Correo invalido'),
    express_validator_2.check('contrasenia').notEmpty({ ignore_whitespace: true }).withMessage('Falta una contraseña').isLength({ min: 4, max: 20 }).withMessage('Contrasenia invalida, debe tener una longitud de 4 a 20 caracteres')
];
exports.premisessValidation = [
    express_validator_2.check('nombre').notEmpty({ ignore_whitespace: true }).withMessage('Es necesario un nombre para la tienda').isString().withMessage('nombre invalido'),
    express_validator_2.check('correoE').notEmpty({ ignore_whitespace: true }).withMessage('Falta un correo').isEmail().withMessage('Correo invalido'),
    express_validator_2.check('direccion').notEmpty({ ignore_whitespace: true }).withMessage('Es necesario una direccion').isString().withMessage('Direccion invalido, de tener por lo menos 4 caracteres'),
    express_validator_2.check('numeroContacto').optional().isString().withMessage('numero invalido'),
    express_validator_2.check('urlPagina').optional().isString().withMessage('URL invalida'),
];
exports.productValidation = [
    express_validator_2.check('nombre').notEmpty({ ignore_whitespace: true }).withMessage('Es necesario un nombre para el producto').isString().withMessage('nombre invalido'),
    express_validator_2.check('descripcion').notEmpty({ ignore_whitespace: true }).withMessage('Falta una descripcion').isString().isLength({ min: 4, max: 100 }).withMessage('descripcion invalida'),
    express_validator_2.check('precio').notEmpty({ ignore_whitespace: true }).withMessage('Es necesario un monto').isNumeric().withMessage('Monto invalido'),
    express_validator_2.check('disponible').notEmpty({ ignore_whitespace: true }).withMessage('Es necesario indicar la disponibilidad').isBoolean().withMessage('valor invalido'),
];
exports.updateProductValidation = [
    express_validator_2.check('nombre').notEmpty({ ignore_whitespace: true }).withMessage('Es necesario un nombre para el producto').isString().withMessage('nombre invalido'),
    express_validator_2.check('descripcion').notEmpty({ ignore_whitespace: true }).withMessage('Falta una descripcion').isString().isLength({ min: 4, max: 100 }).withMessage('descripcion invalida'),
    express_validator_2.check('precio').notEmpty({ ignore_whitespace: true }).withMessage('Es necesario un monto').isNumeric().withMessage('Monto invalido'),
];
const checkResult = (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            status: 400,
            message: 'Error en datos enviados',
            error: errors.array()[0],
        });
    }
    else {
        next();
    }
};
exports.checkResult = checkResult;
//# sourceMappingURL=fields.js.map