import PdfPrinter from "pdfmake";

const fonts = {
	Roboto: {
    	normal: "node_modules/pdfmake/build/vfs_fonts.js",
    	bold: "node_modules/pdfmake/build/vfs_fonts.js",
    	italics: "node_modules/pdfmake/build/vfs_fonts.js",
    	bolditalics: "node_modules/pdfmake/build/vfs_fonts.js",
	},
};

const printer = new PdfPrinter(fonts);

export const PdfUtil = {
	async generatePdf(docDefinition: any): Promise<Buffer> {
    	const pdfDoc = printer.createPdfKitDocument(docDefinition);
    	const chunks: Buffer[] = [];

    	return new Promise<Buffer>((resolve, reject) => {
        	pdfDoc.on("data", (chunk) => chunks.push(chunk));
        	pdfDoc.on("end", () => resolve(Buffer.concat(chunks)));
        	pdfDoc.on("error", (err) => reject(err));
        	pdfDoc.end();
    	});
	},
};
