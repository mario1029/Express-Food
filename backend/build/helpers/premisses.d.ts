import { Premisess } from '@interfaces/Premisess';
export declare const getPremisess: () => Promise<Premisess[]>;
export declare const getPremisessByEmail: (correo: string) => Promise<Premisess[]>;
export declare const getPremisessById: (id: number) => Promise<Premisess>;
export declare const getPremisessByAddress: (direccion: string) => Promise<Premisess[]>;
export declare const insertPremisess: ({ promisse, correo }: {
    promisse: Premisess;
    correo: string;
}) => Promise<Premisess>;
export declare const updatePremisses: ({ promisse, id }: {
    promisse: Premisess;
    id: number;
}) => Promise<Premisess>;
export declare const approvedPremisses: (id: number) => Promise<Premisess>;
export declare const deletePremisses: (id: number) => Promise<boolean>;
//# sourceMappingURL=premisses.d.ts.map