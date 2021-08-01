import { Router } from 'express';
import { approvedPayment, deprecatedPayment } from '@helpers/payment';

const router = Router();

router.put('/approved/:id',async(req, res)=>{
    try {
        const payment= await approvedPayment(+req.params.id);
        res.status(200).json({ status: 200, payment: payment, message: 'pago aprobado' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al aprobar el pago' });
    }
});

router.put('/deprecated/:id',async(req, res)=>{
    try {
        const payment= await deprecatedPayment(+req.params.id);
        res.status(200).json({ status: 200, payment: payment, message: 'pago no aprobado' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al actualizar el pago' });
    }
});

export default router;