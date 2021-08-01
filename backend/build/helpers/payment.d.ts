export declare const createPayment: ({ modoPago, idPedido, montoTotal }: {
    modoPago: number;
    idPedido: number;
    montoTotal: any;
}) => Promise<any>;
export declare const approvedPayment: (id: number) => Promise<any>;
export declare const deprecatedPayment: (id: number) => Promise<any>;
//# sourceMappingURL=payment.d.ts.map