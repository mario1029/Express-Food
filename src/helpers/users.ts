import Pool from '@utils/pool';
import { queries } from '@utils/queries';
import { Usuario } from '@interfaces/usuario';

const pool = Pool.getInstance();

export const updateUser = async ({body, idCorreo}:{body:Usuario, idCorreo:string}): Promise<Usuario>=> {
  const client = await pool.connect();
  const { nombre, correo, numero, direccion } = body;
  try {
    await client.query('BEGIN');
    const response = (await client.query(queries.UPDATE_USER_BY_EMAIL, [nombre, correo, numero, direccion, idCorreo])).rows[0];
    const user: Usuario = {
      nombre: response.nombre,
      correo: response.correo,
      numero: response.numero,
      direccion: response.direccion
    };
    await client.query('COMMIT');
    return user;
  } catch (e) {
    client.query('ROLLBACK');
    console.log(e);
    throw e;
  } finally {
    client.release();
  }
};

export const deleteUser = async (idCorreo:string) : Promise<boolean> => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const response = (await client.query(queries.DELETE_USER_BY_EMAIL, [idCorreo])).rowCount > 0;
    await client.query('COMMIT');
    return response;
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
};
