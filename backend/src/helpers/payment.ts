import Pool from '@utils/pool';
import { queriesPayment } from '@utils/queries';

const pool = Pool.getInstance();

export const createPayment = async({modoPago, idPedido, montoTotal}:{modoPago:number, idPedido:number, montoTotal})=>{
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const response = (await client.query(queriesPayment.CREATE_PAYMENT,[modoPago, idPedido, montoTotal])).rows[0];
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

export const approvedPayment = async(id:number)=>{
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const response = (await client.query(queriesPayment.APPROVED_PAYMENT,[id])).rows[0];
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

export const deprecatedPayment = async(id:number)=>{
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const response = (await client.query(queriesPayment.DEPRECATED_PAYMENT,[id])).rows[0];
        await client.query('COMMIT');
        return response;
    } catch (e) {
        await client.query('CALLBACK');
        console.log(e);
        throw e;
    } finally {
        client.release();
    }
}