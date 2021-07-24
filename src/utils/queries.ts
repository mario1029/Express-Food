export const queries = {
  GET_USERS: `SELECT * FROM usuario`,
  GET_USER_BY_EMAIL: `SELECT * FROM usuario WHERE correo = $1`,
  SIGN_UP_USER: `INSERT INTO usuario (correo, nombre, numero, direccion, contrasenia) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
  UPDATE_USER_BY_EMAIL: `UPDATE usuario SET nombre = $1, correo = $2, numero = $3, direccion = $4  WHERE correo = $5 RETURNING *`,
  DELETE_USER_BY_EMAIL: `DELETE FROM usuario WHERE correo = $1`,
};

export const queriesPremisess={
  GET_PREMISESS:`SELECT * FROM establecimiento`,
  GET_PREMISESS_BY_ADDRESS:`SELECT * FROM establecimiento WHERE  UPPER(direccion) like '%' || UPPER($1) || '%'`,
  INSERT_PREMISESS:`INSERT INTO establecimiento (nombre, direccion, correoe, numerocontacto, urlpagina, correo) values ($1, $2, $3, $4, $5, $6) RETURNING *`,
  UPDATE_PREMISSES:`UPDATE establecimiento SET nombre = $1, direccion = $2, correoe = $3, numerocontacto = $4, urlpagina = $5 where id_establecimiento = $6 RETURNING *`,
  DELETE_PREMISSE:`DELETE FROM establecimiento WHERE id_establecimiento = $1`
}

export const queriesProduct={
  GET_PRODUCT:`SELECT * FROM producto`,
  GET_PRODUCT_BY_PREMISESS:`SELECT * FROM producto, producto_establecimiento WHERE producto.id_producto = producto_establecimiento.id_producto AND producto_establecimiento.id_establecimiento = $1 AND disponible = true`,
  INSERT_PRODUCT:`INSERT INTO producto (nombre, descripcion) VALUES ($1, $2) RETURNING *`,
  INSERT_PRODUCT_PREMISSES:`INSERT INTO producto_establecimiento (id_producto, id_establecimiento, precio, disponible) VALUES ($1, $2, $3, $4) RETURNING *`,
  UPDATE_PRODUCT:`UPDATE producto SET nombre = $1, descripcion = $2 WHERE id_producto = $3`,
  UPDATE_PRICE_PRODUCT:`UPDATE producto_establecimiento SET precio = $1 WHERE id_producto = $2 AND id_establecimiento = $3`,
  SET_AVAILABILITY:`UPDATE producto_establecimiento SET disponible = not disponible WHERE id_producto = $2 AND id_establecimiento = $3`,
  DELETE_PRODUCT:`DELETE FROM producto WHERE id_producto = $1`
}