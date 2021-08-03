import Pool from '@utils/pool';
import { queriesOrder } from '@utils/queries';
import { Order, DetailOrder } from '@interfaces/Order';

const pool = Pool.getInstance();

export const createOrder= async(correo:string): Promise<Order>=>{
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const response = (await client.query(queriesOrder.CREATE_ORDER,[correo])).rows[0];
        const order:Order={
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

export const getOrder= async(correo:string): Promise<Order[]>=>{
    const client = await pool.connect();
    try {
        const response = (await client.query(queriesOrder.GET_ORDER,[correo])).rows;
        const order:Order[]=response.map((rows)=>{
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

export const getOrderDetail= async(id:number): Promise<DetailOrder[]>=>{
    const client = await pool.connect();
    try {
        const response = (await client.query(queriesOrder.GET_ORDER_DETAIL,[id])).rows;
        const order:DetailOrder[]=response.map((rows)=>{
            return{
                idProducto:rows.id_producto,
                producto:rows.nombre,
                cantidad:rows.cantidad,
                precio:rows.precio,
                precioTotal:rows.preciototal
            }
           
        })
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

export const terminateOrder= async(idPedido:number): Promise<boolean>=>{
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const response = (await client.query(queriesOrder.TERMINATE_PEDIDO,[idPedido])).rowCount>0;
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

export const montOrder= async(idPedido:number): Promise<number>=>{
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const response = (await client.query(queriesOrder.MONT_ORDER,[idPedido])).rows[0];
        await client.query('COMMIT');
        return response.sum;
    } catch (e) {
        await client.query('CALLBACK');
        console.log(e);
        throw e;
    } finally {
        client.release();
    }
}