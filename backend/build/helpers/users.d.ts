import { User } from '@interfaces/User';
export declare const updateUser: ({ body, idCorreo }: {
    body: User;
    idCorreo: string;
}) => Promise<User>;
export declare const deleteUser: (idCorreo: string) => Promise<boolean>;
//# sourceMappingURL=users.d.ts.map