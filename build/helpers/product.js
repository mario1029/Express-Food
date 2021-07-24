"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProducto = exports.setAvailability = exports.updateProduct = exports.insertProduct = exports.getProductPremisses = exports.getProduct = void 0;
const pool_1 = __importDefault(require("@utils/pool"));
const queries_1 = require("@utils/queries");
const pool = pool_1.default.getInstance();
const getProduct = async () => {
    const client = await pool.connect();
    try {
        const response = (await client.query(queries_1.queriesProduct.GET_PRODUCT)).rows;
        const product = response.map((rows) => {
            return {
                id_producto: rows.id_producto,
                nombre: rows.nombre,
                descripcion: rows.descripcion,
                precio: rows.precio,
                disponible: rows.disponible
            };
        });
        return product;
    }
    catch (e) {
        console.log(e);
        throw e;
    }
    finally {
        client.release();
    }
};
exports.getProduct = getProduct;
const getProductPremisses = async (idEstablecimiento) => {
    const client = await pool.connect();
    try {
        const response = (await client.query(queries_1.queriesProduct.GET_PRODUCT_BY_PREMISESS, [idEstablecimiento])).rows;
        const product = response.map((rows) => {
            return {
                id_producto: rows.id_producto,
                nombre: rows.nombre,
                descripcion: rows.descripcion,
                precio: rows.precio
            };
        });
        return product;
    }
    catch (e) {
        console.log(e);
        throw e;
    }
    finally {
        client.release();
    }
};
exports.getProductPremisses = getProductPremisses;
const insertProduct = async ({ producto, idEstablecimiento }) => {
    const client = await pool.connect();
    const { nombre, descripcion, precio, disponible } = producto;
    try {
        await client.query('BEGIN');
        const response = (await client.query(queries_1.queriesProduct.INSERT_PRODUCT, [nombre, descripcion, precio, disponible, idEstablecimiento])).rows[0];
        const product = {
            id_producto: response.id_producto,
            nombre: response.nombre,
            descripcion: response.descripcion,
            precio: response.precio,
            disponible: response.disponible
        };
        await client.query('COMMIT');
        return product;
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
exports.insertProduct = insertProduct;
const updateProduct = async ({ producto, idProducto }) => {
    const client = await pool.connect();
    const { nombre, descripcion, precio } = producto;
    try {
        await client.query('BEGIN');
        const response = (await client.query(queries_1.queriesProduct.UPDATE_PRODUCT, [nombre, descripcion, precio, idProducto])).rows[0];
        const product = {
            id_producto: response.id_producto,
            nombre: response.nombre,
            descripcion: response.descripcion,
            precio: response.precio
        };
        await client.query('COMMIT');
        return product;
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
exports.updateProduct = updateProduct;
const setAvailability = async (idProducto) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const response = (await client.query(queries_1.queriesProduct.SET_AVAILABILITY, [idProducto])).rows[0];
        const product = {
            id_producto: response.id_producto,
            nombre: response.nombre,
            descripcion: response.descripcion,
            precio: response.precio
        };
        await client.query('COMMIT');
        return product;
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
exports.setAvailability = setAvailability;
const deleteProducto = async (idProducto) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const response = (await client.query(queries_1.queriesProduct.DELETE_PRODUCT, [idProducto])).rowCount > 0;
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
exports.deleteProducto = deleteProducto;
//# sourceMappingURL=product.js.map