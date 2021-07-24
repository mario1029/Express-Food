import { Usuario } from '@interfaces/usuario';
export declare const updateUser: ({ body, idCorreo }: {
    body: Usuario;
    idCorreo: string;
}) => Promise<Usuario>;
export declare const deleteUser: (idCorreo: string) => Promise<boolean>;
//# sourceMappingURL=users.d.ts.map