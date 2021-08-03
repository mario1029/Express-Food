"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tablePDF = exports.headerPDF = void 0;
const headerPDF = ({ pdf, id, amount, email, date }) => {
    pdf
        .image('./assests/icon.png', 0, 0, { width: 150 })
        .fillColor('#000')
        .font('Times-Roman')
        .fontSize(20)
        .text('INVOICE', 275, 50, { align: 'right' })
        .fontSize(10)
        .text(`Invoice Number: ${id}`, { align: 'right' })
        .text(`Date: ${date}`, { align: 'right' })
        .text(`Total amount: $${amount}`, { align: 'right' })
        .moveDown()
        .text(`User mail:${email}`, { align: 'right' });
    const beginningOfPage = 50;
    const endOfPage = 550;
    pdf.moveTo(beginningOfPage, 250)
        .lineTo(endOfPage, 250)
        .stroke();
};
exports.headerPDF = headerPDF;
const tablePDF = ({ pdf, detail }) => {
    const tableTop = 270;
    const productCodeX = 50;
    const unitPriceX = 300;
    const quantityX = 450;
    const priceX = 500;
    console.log(detail);
    pdf
        .font('Times-Roman')
        .fontSize(10)
        .text('Product', productCodeX, tableTop, { bold: true })
        .text('unit price', unitPriceX, tableTop)
        .text('Quantity', quantityX, tableTop)
        .text('Price', priceX, tableTop);
    let i = 1;
    detail.forEach((rows) => {
        const y = tableTop + 25 + (i * 25);
        pdf
            .font('Times-Roman')
            .fontSize(10)
            .text(rows.producto, productCodeX, y)
            .text(`$ ${rows.precio}`, unitPriceX, y)
            .text(rows.cantidad, quantityX, y)
            .text(`$ ${rows.precioTotal}`, priceX, y);
        console.log(rows.producto, rows.precio, rows.cantidad, rows.precioTotal);
        i++;
    });
};
exports.tablePDF = tablePDF;
//# sourceMappingURL=generatePDF.js.map