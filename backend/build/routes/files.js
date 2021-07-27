"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const multer_2 = __importDefault(require("@utils/multer"));
const files_1 = require("@helpers/files");
const uploads = multer_1.default(multer_2.default);
const router = express_1.Router();
router.put('/product/:id_producto', uploads.single('image'), async (req, res) => {
    try {
        const resultado = await files_1.fileProduct({
            url: req.file?.filename,
            id: +req.params.id_producto
        });
        res.status(200).json({ status: 200, resultado: resultado, message: 'producto actualizado correctamente' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al actualizar los productos' });
    }
});
router.put('/establecimiento/:id_establecimiento', uploads.single('image'), async (req, res) => {
    try {
        const resultado = await files_1.filePremisses({
            url: req.file?.filename,
            id: +req.params.id_establecimiento
        });
        res.status(200).json({ status: 200, resultado: resultado, message: 'producto actualizado correctamente' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al actualizar los productos' });
    }
});
exports.default = router;
//# sourceMappingURL=files.js.map