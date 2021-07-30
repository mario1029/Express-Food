import { Router } from 'express';
import { createOrder, deleteOrder, deleteOrderDetail, getOrder, getOrderDetail, insertOrderDetail, updateOrderDetail } from '@helpers/order';
import { pedido, detallesPedido } from '@interfaces/pedido';

const router = Router();

router.get('',async(req:any, res)=>{
    try {
        const order:pedido[]= await getOrder(req.user.correo);
        res.status(200).json({ status: 200, order: order, message: 'pedidos encontrados correctamente' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al buscar los pedidos' });
    }
});

router.post('/new', async(req:any, res)=>{
    try {
        const order:pedido= await createOrder(req.user.correo);
        res.status(200).json({ status: 200, order: order, message: 'pedido creado correctamente' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al crear el pedido' });
    }
})

router.delete('/delete/:id', async(req, res)=>{
    try {
        const order:boolean= await deleteOrder(+req.params.id)
        res.status(200).json({ status: 200, message: order? 'pedido eliminado correctamente' : 'el pedido no se ha eliminado' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al eliminar el pedido' });
    }
});

router.get('/:id', async(req, res)=>{
    try {
        const order:detallesPedido= await getOrderDetail(+req.params.id);
        res.status(200).json({ status: 200, order: order, message: 'pedido encontrado correctamente' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al buscar el pedido' });
    }
});

router.post('/:id', async(req, res)=>{
    const {idProducto, cantidad}= req.body;
    try {
        const order:boolean= await insertOrderDetail({
            idPedido:+req.params.id,
            idProducto:idProducto,
            cantidad:cantidad
        });
        res.status(200).json({ status: 200, message: order? 'producto insertado correctamente' : 'el producto no se inserto' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al insertar el pedido' });
    }
});

router.put('/:id', async(req, res)=>{
    const {idProducto, cantidad}= req.body;
    try {
        const order:boolean= await updateOrderDetail({
            idPedido:+req.params.id,
            idProducto:idProducto,
            cantidad:cantidad
        });
        res.status(200).json({ status: 200, message: order? 'producto actualizado correctamente' : 'el producto no se actualizo' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al actualizar el pedido' });
    }
});

router.delete('/:id',async(req, res)=>{
    const {idProducto}= req.body;
    try {
        const order:boolean= await deleteOrderDetail({
            idPedido:+req.params.id,
            idProducto:idProducto
    });
        res.status(200).json({ status: 200, message: order? 'producto eliminado del pedido correctamente' : 'el producto no se ha eliminado del pedido' });
    } catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al actualizar el pedido' });
    }
});

export default router;