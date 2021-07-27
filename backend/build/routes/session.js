"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("@validations/auth");
const session_1 = require("@helpers/session");
const middlewares_1 = require("@middlewares/middlewares");
const fields_1 = require("@validations/fields");
const router = express_1.Router();
router.get('/', (req, res) => {
    res.send('Aqui estan las cosas de login');
});
router.get('/logout', auth_1.isAuth, (req, res) => {
    req.logout();
    req.session.alias = null;
    res.json({ status: 200, message: 'Sesión finalizada.' });
});
router.post('/signup', auth_1.isLogged, fields_1.signUpFieldsValidation, fields_1.checkResult, async (req, res) => {
    try {
        const data = await session_1.signUpUser(req.body);
        res.status(200).json({ status: 200, usuario: data, message: 'Usuario registrado satisfactoriamente' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al registrar un usuario' });
    }
});
router.post('/user', auth_1.isLogged, fields_1.loginFieldsValidation, fields_1.checkResult, middlewares_1.passportAuth);
exports.default = router;
//# sourceMappingURL=session.js.map