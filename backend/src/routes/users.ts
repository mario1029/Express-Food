import { Router } from 'express';
import { isAuth } from '@validations/auth';
import { getUserByEmail } from '@helpers/session';
import { updateUserFieldsValidation, checkResult } from '@validations/fields';
import { deleteUser, updateUser } from '@helpers/users';

const router = Router();

router.get('/:correo', async (req, res) => {
  const data = await getUserByEmail(req.params.correo);
  res.send({ nombre: data.nombre, correo: data.correo, contrasenia: data.contrasenia });
});

router.put('/', updateUserFieldsValidation, checkResult, async (req:any, res) => {
  const correo = req.user.correo;
  try {
    const data = await updateUser({
      body: req.body,
      idCorreo:correo
    });
    res.status(200).json({ status: 200, usuario: data, message: 'Usuario actualizado!' });
  } catch (e) {
    res.status(500).json({ status: 500, error: e, message: 'Error al actualizar un usuario' });
  }
});

router.delete('/', async (req:any, res) => {
  const correo = req.user.correo;
  try {
    const data = await deleteUser(correo);
    res.status(200).json({ status: 200, message: 'Usuario eliminado!' });
  } catch (e) {
    res.status(500).json({ status: 500, error: e, message: 'Error al eliminar usuario' });
  }
});

export default router;
