import { DetailOrder } from "@interfaces/Order";
export declare const headerPDF: ({ pdf, id, amount, email, date }: {
    pdf: any;
    id: number;
    amount: number;
    email: string;
    date: string;
}) => void;
export declare const tablePDF: ({ pdf, detail }: {
    pdf: any;
    detail: DetailOrder[];
}) => void;
//# sourceMappingURL=generatePDF.d.ts.map