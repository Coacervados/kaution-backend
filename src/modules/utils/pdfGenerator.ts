import PdfPrinter from "pdfmake";

const fonts = {
    Roboto: {
        normal: "src/assets/fonts/Roboto/static/Roboto-Regular.ttf",
        bold: "src/assets/fonts/Roboto/static/Roboto-Bold.ttf",
        italics: "src/assets/fonts/Roboto/static/Roboto-Italic.ttf",
        bolditalics: "src/assets/fonts/Roboto/static/Roboto-BoldItalic.ttf",
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
