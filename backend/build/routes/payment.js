"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_1 = require("@helpers/payment");
const router = express_1.Router();
router.put('/approved/:id', async (req, res) => {
    try {
        const payment = await payment_1.approvedPayment(+req.params.id);
        res.status(200).json({ status: 200, payment: payment, message: 'pago aprobado' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al aprobar el pago' });
    }
});
router.put('/deprecated/:id', async (req, res) => {
    try {
        const payment = await payment_1.deprecatedPayment(+req.params.id);
        res.status(200).json({ status: 200, payment: payment, message: 'pago no aprobado' });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al actualizar el pago' });
    }
});
exports.default = router;
//# sourceMappingURL=payment.js.map