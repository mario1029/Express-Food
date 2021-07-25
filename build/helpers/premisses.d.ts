import { establecimiento } from '@interfaces/establecimientos';
export declare const getPremisess: () => Promise<establecimiento[]>;
export declare const getPremisessByAddress: (direccion: string) => Promise<establecimiento[]>;
export declare const insertPremisess: ({ promisse, correo }: {
    promisse: establecimiento;
    correo: string;
}) => Promise<establecimiento>;
export declare const updatePremisses: ({ promisse, id }: {
    promisse: establecimiento;
    id: number;
}) => Promise<establecimiento>;
export declare const approvedPremisses: (id: number) => Promise<establecimiento>;
export declare const deletePremisses: (id: number) => Promise<boolean>;
//# sourceMappingURL=premisses.d.ts.map