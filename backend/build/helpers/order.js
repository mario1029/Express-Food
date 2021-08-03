"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDirecByOrder = exports.montOrder = exports.deleteOrder = exports.deleteOrderDetail = exports.terminateOrder = exports.updateOrderDetail = exports.insertOrderDetail = exports.getOrderDetail = exports.getOrder = exports.createOrder = void 0;
const pool_1 = __importDefault(require("@utils/pool"));
const queries_1 = require("@utils/queries");
const pool = pool_1.default.getInstance();
const createOrder = async (correo) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const response = (await client.query(queries_1.queriesOrder.CREATE_ORDER, [correo])).rows[0];
        const order = {
            idPedido: response.id_pedido,
            correoU: response.correo,
            fecha: response.fecha
        };
        await client.query('COMMIT');
        return order;
    }
    catch (e) {
        await client.query('CALLBACK');
        console.log(e);
        throw e;
    }
    finally {
        client.release();
    }
};
exports.createOrder = createOrder;
const getOrder = async (correo) => {
    const client = await pool.connect();
    try {
        const response = (await client.query(queries_1.queriesOrder.GET_ORDER, [correo])).rows;
        const order = response.map((rows) => {
            return {
                idPedido: rows.id_pedido,
                correoU: rows.correo,
                fecha: rows.fecha
            };
        });
        return order;
    }
    catch (e) {
        console.log(e);
        throw e;
    }
    finally {
        client.release();
    }
};
exports.getOrder = getOrder;
const getOrderDetail = async (id) => {
    const client = await pool.connect();
    try {
        const response = (await client.query(queries_1.queriesOrder.GET_ORDER_DETAIL, [id])).rows;
        const order = response.map((rows) => {
            return {
                idProducto: rows.id_producto,
                producto: rows.nombre,
                cantidad: rows.cantidad,
                precio: rows.precio,
                precioTotal: rows.preciototal
            };
        });
        return order;
    }
    catch (e) {
        console.log(e);
        throw e;
    }
    finally {
        client.release();
    }
};
exports.getOrderDetail = getOrderDetail;
const insertOrderDetail = async ({ idPedido, idProducto, cantidad }) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const response = (await client.query(queries_1.queriesOrder.INSERT_ORDER_DETAIL, [idPedido, idProducto, cantidad])).rowCount > 0;
        await client.query('COMMIT');
        return response;
    }
    catch (e) {
        await client.query('CALLBACK');
        console.log(e);
        throw e;
    }
    finally {
        client.release();
    }
};
exports.insertOrderDetail = insertOrderDetail;
const updateOrderDetail = async ({ idPedido, idProducto, cantidad }) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const response = (await client.query(queries_1.queriesOrder.UPDATE_ORDER_DETAIL, [cantidad, idPedido, idProducto])).rowCount > 0;
        await client.query('COMMIT');
        return response;
    }
    catch (e) {
        await client.query('CALLBACK');
        console.log(e);
        throw e;
    }
    finally {
        client.release();
    }
};
exports.updateOrderDetail = updateOrderDetail;
const terminateOrder = async (idPedido) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const response = (await client.query(queries_1.queriesOrder.TERMINATE_PEDIDO, [idPedido])).rowCount > 0;
        await client.query('COMMIT');
        return response;
    }
    catch (e) {
        await client.query('CALLBACK');
        console.log(e);
        throw e;
    }
    finally {
        client.release();
    }
};
exports.terminateOrder = terminateOrder;
const deleteOrderDetail = async ({ idPedido, idProducto }) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const response = (await client.query(queries_1.queriesOrder.DELETE_ORDER_DETAIL, [idPedido, idProducto])).rowCount > 0;
        await client.query('COMMIT');
        return response;
    }
    catch (e) {
        await client.query('CALLBACK');
        console.log(e);
        throw e;
    }
    finally {
        client.release();
    }
};
exports.deleteOrderDetail = deleteOrderDetail;
const deleteOrder = async (idPedido) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const response = (await client.query(queries_1.queriesOrder.DELETE_ORDER, [idPedido])).rowCount > 0;
        await client.query('COMMIT');
        return response;
    }
    catch (e) {
        await client.query('CALLBACK');
        console.log(e);
        throw e;
    }
    finally {
        client.release();
    }
};
exports.deleteOrder = deleteOrder;
const montOrder = async (idPedido) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const response = (await client.query(queries_1.queriesOrder.MONT_ORDER, [idPedido])).rows[0];
        await client.query('COMMIT');
        return response.sum;
    }
    catch (e) {
        await client.query('CALLBACK');
        console.log(e);
        throw e;
    }
    finally {
        client.release();
    }
};
exports.montOrder = montOrder;
const getDirecByOrder = async (idPedido) => {
    const client = await pool.connect();
    try {
        const response = (await client.query(queries_1.queriesOrder.GET_DIRECC_PREMISESS_IN_ORDER, [idPedido])).rows;
        const orderDirec = response.map((rows) => {
            return {
                nombre: rows.nombre,
                latitud: rows.latitud,
                longitud: rows.longitud
            };
        });
        return orderDirec;
    }
    catch (e) {
        console.log(e);
        throw e;
    }
    finally {
        client.release();
    }
};
exports.getDirecByOrder = getDirecByOrder;
//# sourceMappingURL=order.js.map