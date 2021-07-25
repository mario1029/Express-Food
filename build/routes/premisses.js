"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fields_1 = require("@validations/fields");
const premisses_1 = require("@helpers/premisses");
const router = express_1.Router();
router.get('', async (req, res) => {
    try {
        const establecimiento = await premisses_1.getPremisess();
        res.status(200).json({ status: 200, establecimientos: establecimiento, message: 'Establecimientos encontrados correctamente' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al buscar los establecimientos' });
    }
});
router.get('/address/:address', async (req, res) => {
    try {
        const establecimiento = await premisses_1.getPremisessByAddress(req.params.address);
        res.status(200).json({ status: 200, establecimientos: establecimiento, message: 'Establecimientos encontrados correctamente' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al buscar los establecimientos' });
    }
});
router.post('/new', fields_1.premisessValidation, fields_1.checkResult, async (req, res) => {
    try {
        const establecimiento = await premisses_1.insertPremisess({
            promisse: req.body,
            correo: req.user.correo
        });
        res.status(200).json({ status: 200, establecimientos: establecimiento, message: 'Establecimiento creado correctamente' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al crear el establecimiento' });
    }
});
router.put('/approved/:id', async (req, res) => {
    try {
        const establecimiento = await premisses_1.approvedPremisses(+req.params.id);
        res.status(200).json({ status: 200, establecimientos: establecimiento, message: 'Establecimiento aprobado correctamente' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al aprobar el establecimiento' });
    }
});
router.put('/:id', fields_1.premisessValidation, fields_1.checkResult, async (req, res) => {
    try {
        const establecimiento = await premisses_1.updatePremisses({
            promisse: req.body,
            id: +req.params.id
        });
        res.status(200).json({ status: 200, establecimientos: establecimiento, message: 'Establecimientos actualizado correctamente' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al actualizar el establecimiento' });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const resultado = await premisses_1.deletePremisses(+req.params.id);
        res.status(200).json({ status: 200, resultado: resultado, message: 'Establecimientos borrado correctamente' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al borrar el establecimiento' });
    }
});
exports.default = router;
//# sourceMappingURL=premisses.js.map