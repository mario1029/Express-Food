import Pool from '@utils/pool';
import { queriesOrder } from '@utils/queries';
import { pedido, detallesPedido } from '@interfaces/pedido';

const pool = Pool.getInstance();

export const createOrder= async(correo:string): Promise<pedido>=>{
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const response = (await client.query(queriesOrder.CREATE_ORDER,[correo])).rows[0];
        const order:pedido={
            idPedido:response.id_pedido,
            correoU:response.correo,
            fecha:response.fecha
        }
        await client.query('COMMIT');
        return order;
    } catch (e) {
        await client.query('CALLBACK');
        console.log(e);
        throw e;
    } finally {
        client.release();
    }
};

export const getOrder= async(correo:string): Promise<pedido[]>=>{
    const client = await pool.connect();
    try {
        const response = (await client.query(queriesOrder.GET_ORDER,[correo])).rows;
        const order:pedido[]=response.map((rows)=>{
            return{
                idPedido:rows.id_pedido,
                correoU:rows.correo,
                fecha:rows.fecha
            }
        });
        return order;
    } catch (e) {
        console.log(e);
        throw e;
    } finally {
        client.release();
    }
};

export const getOrderDetail= async(id:number): Promise<detallesPedido>=>{
    const client = await pool.connect();
    try {
        const response = (await client.query(queriesOrder.GET_ORDER_DETAIL,[id])).rows[0];
        const order:detallesPedido={
            producto:response.nombre,
            cantidad:response.cantidad
        }
        return order;
    } catch (e) {
        console.log(e);
        throw e;
    } finally {
        client.release();
    }
};

export const insertOrderDetail= async({idPedido, idProducto, cantidad}:{idPedido:number, idProducto:number, cantidad:number}): Promise<boolean>=>{
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const response = (await client.query(queriesOrder.INSERT_ORDER_DETAIL,[idPedido, idProducto, cantidad])).rowCount>0;
        await client.query('COMMIT');
        return response;
    } catch (e) {
        await client.query('CALLBACK');
        console.log(e);
        throw e;
    } finally {
        client.release();
    }
};

export const updateOrderDetail= async({idPedido, idProducto, cantidad}:{idPedido:number, idProducto:number, cantidad:number}): Promise<boolean>=>{
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const response = (await client.query(queriesOrder.UPDATE_ORDER_DETAIL,[cantidad, idPedido, idProducto])).rowCount>0;
        await client.query('COMMIT');
        return response;
    } catch (e) {
        await client.query('CALLBACK');
        console.log(e);
        throw e;
    } finally {
        client.release();
    }
};

export const deleteOrderDetail= async({idPedido, idProducto}:{idPedido:number, idProducto:number}): Promise<boolean>=>{
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const response = (await client.query(queriesOrder.DELETE_ORDER_DETAIL,[idPedido, idProducto])).rowCount>0;
        await client.query('COMMIT');
        return response;
    } catch (e) {
        await client.query('CALLBACK');
        console.log(e);
        throw e;
    } finally {
        client.release();
    }
};

export const deleteOrder= async(idPedido:number): Promise<boolean>=>{
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const response = (await client.query(queriesOrder.DELETE_ORDER,[idPedido])).rowCount>0;
        await client.query('COMMIT');
        return response;
    } catch (e) {
        await client.query('CALLBACK');
        console.log(e);
        throw e;
    } finally {
        client.release();
    }
};