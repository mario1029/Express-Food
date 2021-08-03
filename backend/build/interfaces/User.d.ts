export interface User {
    nombre: string;
    correo: string;
    numero?: string;
    direccion: string;
    admin?: boolean;
}
export interface UserComplete extends User {
    contrasenia?: string;
}
//# sourceMappingURL=User.d.ts.map