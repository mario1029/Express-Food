"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_1 = require("@helpers/order");
const stripe_1 = __importDefault(require("stripe"));
const payment_1 = require("@helpers/payment");
const pdfkit_1 = __importDefault(require("pdfkit"));
const fs_1 = __importDefault(require("fs"));
const stripe = new stripe_1.default('sk_test_51JIvqpL860qRAIcDiIK0nDBgdfE68TJDMNJdldtKH5Lj8xUC42TXUMDJzGaD5q5jrolwm6hYX0Z9QRV4ElELhnWG004J5wSnp3', { apiVersion: "2020-08-27" });
const router = express_1.Router();
router.get('', async (req, res) => {
    try {
        const order = await order_1.getOrder(req.user.correo);
        res.status(200).json({ status: 200, order: order, message: 'pedidos encontrados correctamente' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al buscar los pedidos' });
    }
});
router.post('/new', async (req, res) => {
    try {
        const order = await order_1.createOrder(req.user.correo);
        res.status(200).json({ status: 200, order: order, message: 'pedido creado correctamente' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al crear el pedido' });
    }
});
router.post('/pay/:id', async (req, res) => {
    try {
        const mont = await order_1.montOrder(+req.params.id);
        const pago = await payment_1.createPayment({
            modoPago: 1,
            idPedido: +req.params.id,
            montoTotal: mont
        });
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(mont * 100),
            currency: "usd",
            payment_method_types: ["card"], //by default
        });
        const clientSecret = paymentIntent.client_secret;
        res.status(200).json({ status: 200, client: { client: clientSecret, idPago: pago.id_pago }, message: 'pedido creado correctamente' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al crear el pedido' });
    }
});
router.delete('/delete/:id', async (req, res) => {
    try {
        const order = await order_1.deleteOrder(+req.params.id);
        res.status(200).json({ status: 200, message: order ? 'pedido eliminado correctamente' : 'el pedido no se ha eliminado' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al eliminar el pedido' });
    }
});
router.get('/invoice/:id', async (req, res) => {
    try {
        //busqueda de datos
        const mont = await order_1.montOrder(+req.params.id);
        const detallesPedido = await order_1.getOrderDetail(+req.params.id);
        const doc = new pdfkit_1.default;
        //generacion de pd
        doc.pipe(fs_1.default.createWriteStream(`build/uploads/${req.user.correo}_Invoice${req.params.id}.pdf`));
        doc.fontSize(20)
            .text('Factura', {
            align: 'center',
            stroke: true
        });
        doc.moveDown();
        const productX = 50;
        const quantityX = 150;
        const priceX = 250;
        const topY = 150;
        doc
            .fontSize(12)
            .text('Producto', productX, topY, {
            align: 'justify',
            stroke: true
        })
            .text('Cantidad', quantityX, topY, {
            align: 'justify',
            stroke: true
        })
            .text('Precio', priceX, topY, {
            align: 'rigth',
            stroke: true
        });
        doc.moveDown();
        let i = 1;
        detallesPedido.forEach((rows) => {
            doc
                .fontSize(12)
                .text(rows.producto, productX, topY + 50 * i, {
                align: 'justify'
            })
                .text(rows.cantidad.toString(), quantityX, topY + 50 * i, {
                align: 'justify'
            })
                .text(rows.precio.toString(), priceX, topY + 50 * i, {
                align: 'rigth'
            });
            i++;
        });
        doc
            .fontSize(12)
            .text("Monto", quantityX, topY + 50 * i, {
            stroke: true
        })
            .text(`$ ${mont}`, priceX, topY + 50 * i);
        doc.end();
        res.status(200).json({ status: 200, message: 'Error al eliminar el pedido' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al eliminar el pedido' });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const order = await order_1.getOrderDetail(+req.params.id);
        res.status(200).json({ status: 200, order: order, message: 'pedido encontrado correctamente' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al buscar el pedido' });
    }
});
router.post('/:id', async (req, res) => {
    const { idProducto, cantidad } = req.body;
    try {
        const order = await order_1.insertOrderDetail({
            idPedido: +req.params.id,
            idProducto: idProducto,
            cantidad: cantidad
        });
        res.status(200).json({ status: 200, message: order ? 'producto insertado correctamente' : 'el producto no se inserto' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al insertar el pedido' });
    }
});
router.put('/:id', async (req, res) => {
    const { idProducto, cantidad } = req.body;
    try {
        const order = await order_1.updateOrderDetail({
            idPedido: +req.params.id,
            idProducto: idProducto,
            cantidad: cantidad
        });
        res.status(200).json({ status: 200, message: order ? 'producto actualizado correctamente' : 'el producto no se actualizo' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al actualizar el pedido' });
    }
});
router.delete('/:id', async (req, res) => {
    const { idProducto } = req.body;
    try {
        const order = await order_1.deleteOrderDetail({
            idPedido: +req.params.id,
            idProducto: idProducto
        });
        res.status(200).json({ status: 200, message: order ? 'producto eliminado del pedido correctamente' : 'el producto no se ha eliminado del pedido' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al actualizar el pedido' });
    }
});
exports.default = router;
//# sourceMappingURL=order.js.map