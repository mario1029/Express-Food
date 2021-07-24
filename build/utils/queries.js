"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queriesProduct = exports.queriesPremisess = exports.queries = void 0;
exports.queries = {
    GET_USERS: `SELECT * FROM usuario`,
    GET_USER_BY_EMAIL: `SELECT * FROM usuario WHERE correo = $1`,
    SIGN_UP_USER: `INSERT INTO usuario (correo, nombre, numero, direccion, contrasenia) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    UPDATE_USER_BY_EMAIL: `UPDATE usuario SET nombre = $1, correo = $2, numero = $3, direccion = $4  WHERE correo = $5 RETURNING *`,
    DELETE_USER_BY_EMAIL: `DELETE FROM usuario WHERE correo = $1`,
};
exports.queriesPremisess = {
    GET_PREMISESS: `SELECT * FROM establecimiento`,
    GET_PREMISESS_BY_ADDRESS: `SELECT * FROM establecimiento WHERE  UPPER(direccion) like '%' || UPPER($1) || '%'`,
    INSERT_PREMISESS: `INSERT INTO establecimiento (nombre, direccion, correoe, numerocontacto, urlpagina, correo) values ($1, $2, $3, $4, $5, $6) RETURNING *`,
    UPDATE_PREMISSES: `UPDATE establecimiento SET nombre = $1, direccion = $2, correoe = $3, numerocontacto = $4, urlpagina = $5 where id_establecimiento = $6 RETURNING *`,
    DELETE_PREMISSE: `DELETE FROM establecimiento WHERE id_establecimiento = $1`
};
exports.queriesProduct = {
    GET_PRODUCT: `SELECT * FROM producto`,
    GET_PRODUCT_BY_PREMISESS: `SELECT * FROM producto WHERE id_establecimiento = $1 AND disponible = true`,
    INSERT_PRODUCT: `INSERT INTO producto (nombre, descripcion,precio, disponible, id_establecimiento) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    UPDATE_PRODUCT: `UPDATE producto SET nombre = $1, descripcion = $2, precio = $3  WHERE id_producto = $4 RETURNING *`,
    SET_AVAILABILITY: `UPDATE producto SET disponible = not disponible WHERE id_producto = $1 RETURNING *`,
    DELETE_PRODUCT: `DELETE FROM producto WHERE id_producto = $1`
};
//# sourceMappingURL=queries.js.map