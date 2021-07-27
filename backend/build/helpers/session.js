"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = exports.comparePassword = exports.signUpUser = void 0;
const pool_1 = __importDefault(require("@utils/pool"));
const queries_1 = require("@utils/queries");
const bcryptjs_1 = require("bcryptjs");
const pool = pool_1.default.getInstance();
const signUpUser = async function (body) {
    const client = await pool.connect();
    const { nombre, correo, contrasenia, numero, direccion } = body;
    try {
        await client.query('BEGIN');
        const salt = bcryptjs_1.genSaltSync(10);
        const hashedPassword = bcryptjs_1.hashSync(contrasenia, salt);
        const response = (await client.query(queries_1.queries.SIGN_UP_USER, [correo, nombre, numero, direccion, hashedPassword])).rows[0];
        const user = {
            nombre: response.nombre,
            correo: response.correo,
            numero: response.numero,
            direccion: response.direccion
        };
        await client.query('COMMIT');
        return user;
    }
    catch (e) {
        await client.query('ROLLBACK');
        throw e;
    }
    finally {
        client.release();
    }
};
exports.signUpUser = signUpUser;
const comparePassword = (candidate, hash) => {
    return new Promise((res, rej) => {
        bcryptjs_1.compare(candidate, hash, (err, isMatch) => {
            if (err)
                rej(err);
            res(isMatch);
        });
    });
};
exports.comparePassword = comparePassword;
const getUserByEmail = async (correo) => {
    const client = await pool.connect();
    try {
        const response = (await client.query(queries_1.queries.GET_USER_BY_EMAIL, [correo])).rows[0];
        const users = {
            nombre: response.nombre,
            correo: response.correo,
            contrasenia: response.contrasenia,
            numero: response.numero,
            direccion: response.direccion
        };
        return users;
    }
    catch (e) {
        throw e;
    }
    finally {
        client.release();
    }
};
exports.getUserByEmail = getUserByEmail;
//# sourceMappingURL=session.js.map