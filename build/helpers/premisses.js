"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePremisses = exports.approvedPremisses = exports.updatePremisses = exports.insertPremisess = exports.getPremisessByAddress = exports.getPremisess = void 0;
const pool_1 = __importDefault(require("@utils/pool"));
const queries_1 = require("@utils/queries");
const pool = pool_1.default.getInstance();
const getPremisess = async () => {
    const client = await pool.connect();
    try {
        const response = (await client.query(queries_1.queriesPremisess.GET_PREMISESS)).rows;
        const user = response.map((rows) => {
            return {
                nombre: rows.nombre,
                correoE: rows.correoe,
                numeroContacto: rows.numerocontacto,
                direccion: rows.direccion,
                urlPagina: rows.urlpagina,
                aprobado: rows.aprobado,
                urlFoto: rows.urlfoto
            };
        });
        return user;
    }
    catch (e) {
        console.log(e);
        throw e;
    }
    finally {
        client.release();
    }
};
exports.getPremisess = getPremisess;
const getPremisessByAddress = async (direccion) => {
    const client = await pool.connect();
    try {
        const response = (await client.query(queries_1.queriesPremisess.GET_PREMISESS_BY_ADDRESS, [direccion])).rows;
        const user = response.map((rows) => {
            return {
                nombre: rows.nombre,
                correoE: rows.correoe,
                numeroContacto: rows.numerocontacto,
                direccion: rows.direccion,
                urlPagina: rows.urlpagina,
                urlFoto: rows.urlfoto
            };
        });
        return user;
    }
    catch (e) {
        console.log(e);
        throw e;
    }
    finally {
        client.release();
    }
};
exports.getPremisessByAddress = getPremisessByAddress;
const insertPremisess = async ({ promisse, correo }) => {
    const client = await pool.connect();
    const { nombre, direccion, correoE, numeroContacto, urlPagina } = promisse;
    try {
        await client.query('BEGIN');
        const response = (await client.query(queries_1.queriesPremisess.INSERT_PREMISESS, [nombre, direccion, correoE, numeroContacto, urlPagina, correo])).rows[0];
        const user = {
            nombre: response.nombre,
            correoE: response.correoe,
            numeroContacto: response.numerocontacto,
            direccion: response.direccion,
            urlPagina: response.urlpagina
        };
        await client.query('COMMIT');
        return user;
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
exports.insertPremisess = insertPremisess;
const updatePremisses = async ({ promisse, id }) => {
    const client = await pool.connect();
    const { nombre, direccion, correoE, numeroContacto, urlPagina } = promisse;
    try {
        await client.query('BEGIN');
        const response = (await client.query(queries_1.queriesPremisess.UPDATE_PREMISSES, [nombre, direccion, correoE, numeroContacto, urlPagina, id])).rows[0];
        const user = {
            nombre: response.nombre,
            correoE: response.correoe,
            numeroContacto: response.numerocontacto,
            direccion: response.direccion,
            urlPagina: response.urlpagina
        };
        await client.query('COMMIT');
        return user;
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
exports.updatePremisses = updatePremisses;
const approvedPremisses = async (id) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const response = (await client.query(queries_1.queriesPremisess.SET_APPROVED, [id])).rows[0];
        const user = {
            nombre: response.nombre,
            correoE: response.correoe,
            numeroContacto: response.numerocontacto,
            direccion: response.direccion,
            urlPagina: response.urlpagina,
            aprobado: response.aprobado
        };
        await client.query('COMMIT');
        return user;
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
exports.approvedPremisses = approvedPremisses;
const deletePremisses = async (id) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const response = (await client.query(queries_1.queriesPremisess.DELETE_PREMISSE, [id])).rowCount > 0;
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
exports.deletePremisses = deletePremisses;
//# sourceMappingURL=premisses.js.map