export const queries = {
  GET_USERS: `SELECT * FROM usuario`,
  GET_USER_BY_EMAIL: `SELECT * FROM usuario WHERE correo = $1`,
  SIGN_UP_USER: `INSERT INTO usuario (correo, nombre, numero, direccion, contrasenia) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
  UPDATE_USER_BY_EMAIL: `UPDATE usuario SET nombre = $1, correo = $2, numero = $3, direccion = $4  WHERE correo = $5 RETURNING *`,
  DELETE_USER_BY_EMAIL: `DELETE FROM usuario WHERE correo = $1`,
};

export const queriesPremisess={
  GET_PREMISESS:`SELECT * FROM establecimiento WHERE aprobado = true`,
  GET_PREMISESS_BY_EMAIL:`SELECT * FROM establecimiento WHERE correo = $1`,
  GET_PREMISESS_BY_ID:`SELECT * FROM establecimiento WHERE id_establecimiento = $1`,
  GET_PREMISESS_BY_ADDRESS:`SELECT * FROM establecimiento WHERE  UPPER(direccion) like '%' || UPPER($1) || '%' AND aprobado = true`,
  INSERT_PREMISESS:`INSERT INTO establecimiento (nombre, direccion, correoe, numerocontacto, urlpagina, correo, latitud, longitud) values ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
  UPDATE_PREMISSES:`UPDATE establecimiento SET nombre = $1, direccion = $2, correoe = $3, numerocontacto = $4, urlpagina = $5 where id_establecimiento = $6 RETURNING *`,
  SET_IMAGE:`UPDATE establecimiento SET urlfoto = $1 WHERE id_establecimiento = $2 RETURNING *`,
  SET_APPROVED:`UPDATE establecimiento SET aprobado = true WHERE id_establecimiento = $1 RETURNING *`,
  DELETE_PREMISSE:`DELETE FROM establecimiento WHERE id_establecimiento = $1`
}

export const queriesProduct={
  GET_PRODUCT:`SELECT * FROM producto  WHERE id_producto = $1`,
  GET_PRODUCT_BY_PREMISESS:`SELECT * FROM producto  WHERE id_establecimiento = $1`,
  GET_PRODUCT_BY_PREMISESS_FILTER:`SELECT * FROM producto WHERE id_establecimiento = $1 AND disponible = true`,
  INSERT_PRODUCT:`INSERT INTO producto (nombre, descripcion,precio, disponible, id_establecimiento) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
  UPDATE_PRODUCT:`UPDATE producto SET nombre = $1, descripcion = $2, precio = $3  WHERE id_producto = $4 RETURNING *`,
  SET_IMAGE:`UPDATE producto SET urlfoto = $1 WHERE id_producto = $2 RETURNING *`,
  SET_AVAILABILITY:`UPDATE producto SET disponible = not disponible WHERE id_producto = $1 RETURNING *`,
  DELETE_PRODUCT:`DELETE FROM producto WHERE id_producto = $1`
}

export const queriesOrder={
  CREATE_ORDER:`INSERT INTO pedido (correo, fecha) values ($1, CURRENT_DATE) RETURNING *`,
  GET_ORDER:`SELECT * FROM pedido WHERE correo  like  $1 AND finalizado IS NOT true`,
  GET_ORDER_DETAIL:`SELECT producto.id_producto, nombre, cantidad, producto.precio, SUM(precio * cantidad) as precioTotal FROM producto, detalles_pedido WHERE producto.id_producto=detalles_pedido.id_producto  AND  id_pedido  = $1 GROUP BY nombre, cantidad, producto.id_producto;`,
  GET_DIRECC_PREMISESS_IN_ORDER:`SELECT nombre, latitud, longitud FROM establecimiento WHERE id_establecimiento IN (SELECT id_establecimiento FROM detalles_pedido, producto WHERE producto.id_producto=detalles_pedido.id_producto AND id_pedido= $1)`,
  INSERT_ORDER_DETAIL:`INSERT INTO detalles_pedido (id_pedido, id_producto, cantidad) VALUES ($1, $2, $3) RETURNING *`,
  UPDATE_ORDER_DETAIL:`UPDATE detalles_pedido SET cantidad = $1  WHERE id_pedido = $2 AND id_producto  = $3 RETURNING *`,
  DELETE_ORDER_DETAIL:`DELETE FROM detalles_pedido WHERE id_pedido  = $1  AND id_producto = $2`,
  DELETE_ORDER:`DELETE FROM pedido WHERE id_pedido  = $1`,
  MONT_ORDER:`SELECT SUM(precio * cantidad) FROM producto, detalles_pedido WHERE producto.id_producto=detalles_pedido.id_producto  AND  id_pedido  = $1`,
  TERMINATE_PEDIDO:`UPDATE pedido SET finalizado = true WHERE id_pedido = $1 RETURNING *`
}

export const queriesPayment={
  CREATE_PAYMENT:`INSERT INTO pago (id_modo_pago, id_pedido, monto_total, fecha_de_pago) VALUES ($1, $2, $3, current_date) RETURNING *`,
  APPROVED_PAYMENT:`UPDATE pago SET estado_pago = true WHERE id_pago  = $1`,
  DEPRECATED_PAYMENT:`UPDATE pago SET estado_pago = false WHERE id_pago  = $1`,
}