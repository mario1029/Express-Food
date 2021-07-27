import Pool from '@utils/pool';
import { queries } from '@utils/queries';
import { compare, genSaltSync, hashSync } from 'bcryptjs';
import { Usuario, UsuarioCompleto } from '@interfaces/usuario';

const pool = Pool.getInstance();

export const signUpUser = async function (body:UsuarioCompleto): Promise<Usuario> {
  const client = await pool.connect();
  const { nombre, correo, contrasenia, numero, direccion } = body;
  try {
    await client.query('BEGIN');
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(contrasenia, salt);
    const response = (await client.query(queries.SIGN_UP_USER, [correo, nombre, numero, direccion, hashedPassword])).rows[0];
    const user: Usuario = {
      nombre: response.nombre,
      correo: response.correo,
      numero: response.numero,
      direccion: response.direccion
    };
    await client.query('COMMIT');
    return user;
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
};

export const comparePassword = (candidate, hash) => {
  return new Promise((res, rej) => {
    compare(candidate, hash, (err, isMatch) => {
      if (err) rej(err);
      res(isMatch);
    });
  });
};

export const getUserByEmail = async (correo: string): Promise<UsuarioCompleto> => {
  const client = await pool.connect();

  try {
    const response = (await client.query(queries.GET_USER_BY_EMAIL, [correo])).rows[0];
    const users: UsuarioCompleto= {
        nombre: response.nombre,
        correo: response.correo,
        contrasenia: response.contrasenia,
        numero: response.numero,
        direccion:response.direccion
    }
    return users;
  } catch (e) {
    throw e;
  } finally {
    client.release();
  }
};
