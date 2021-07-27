import { getUserByEmail, comparePassword } from '@helpers/session';
import { Strategy } from 'passport-local';
import { UsuarioCompleto } from '@interfaces/usuario';

export const LocalStrategy = new Strategy(
  {
    usernameField: 'correo',
    passwordField: 'contrasenia',
  },
  async (correo, contrasenia, done) => {
    try {
      const user = await getUserByEmail(correo);

      if (!user) {
        return done(null, false);
      }

      const isMatch = await comparePassword(contrasenia, user.contrasenia);

      delete user.contrasenia;
      return isMatch ? done(null, user) : done(null, false);
    } catch (e) {
      return done(null, false);
    }
  }
);
