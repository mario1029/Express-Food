import { User, UserComplete } from '@interfaces/User';
export declare const signUpUser: (body: UserComplete) => Promise<User>;
export declare const comparePassword: (candidate: any, hash: any) => Promise<unknown>;
export declare const getUserByEmail: (correo: string) => Promise<UserComplete>;
//# sourceMappingURL=session.d.ts.map