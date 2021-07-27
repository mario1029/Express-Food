export interface Usuario {
  nombre?: string;
  correo: string;
  numero?: string;
  direccion?: string;
  admin?: boolean;
}

export interface UsuarioCompleto extends Usuario {
  contrasenia?: string;
}
