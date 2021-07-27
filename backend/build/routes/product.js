"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fields_1 = require("@validations/fields");
const product_1 = require("@helpers/product");
const router = express_1.Router();
router.get('/lista/:idEstabecimirnto', async (req, res) => {
    try {
        const producto = await product_1.getProduct(+req.params.idEstabecimirnto);
        res.status(200).json({ status: 200, productos: producto, message: 'productos encontrados correctamente' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al buscar los productos' });
    }
});
router.get('/lista/filtrar/:idEstablecimiento', async (req, res) => {
    try {
        const producto = await product_1.getProductFilter(+req.params.idEstablecimiento);
        res.status(200).json({ status: 200, productos: producto, message: 'productos encontrados correctamente' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al buscar los productos' });
    }
});
router.post('/new/:idEstablecimiento', fields_1.productValidation, fields_1.checkResult, async (req, res) => {
    try {
        const producto = await product_1.insertProduct({
            producto: req.body,
            idEstablecimiento: +req.params.idEstablecimiento
        });
        res.status(200).json({ status: 200, producto: producto, message: 'producto encontrado correctamente' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al buscar el producto' });
    }
});
router.put('/disponible/:idProducto', async (req, res) => {
    try {
        const producto = await product_1.setAvailability(+req.params.idProducto);
        res.status(200).json({ status: 200, producto: producto, message: 'productos actualizado correctamente' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al actualizar los productos' });
    }
});
router.put('/:idProducto', fields_1.updateProductValidation, fields_1.checkResult, async (req, res) => {
    try {
        const producto = await product_1.updateProduct({
            producto: req.body,
            idProducto: +req.params.idProducto
        });
        res.status(200).json({ status: 200, producto: producto, message: 'producto actualizado correctamente' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al actualizar el producto' });
    }
});
router.delete('/:idProducto', async (req, res) => {
    try {
        const producto = await product_1.deleteProducto(+req.params.idProducto);
        res.status(200).json({ status: 200, producto: producto, message: producto ? 'producto eliminado correctamente' : 'no se ha eliminada ningun producto' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al eliminar el producto' });
    }
});
exports.default = router;
//# sourceMappingURL=product.js.map