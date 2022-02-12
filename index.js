const { PDFDocument } = require('pdf-lib');
const { inquirer } = require('inquirer');
const { readFile, writeFile } = require('fs/promises');

async function createPdf(input, output) {
    try {
        const pdfDoc = await PDFDocument.load(await readFile(input));

        // Modify doc, fill out the form...

        const pdfBytes = await pdfDoc.save();

        await writeFile(output, pdfBytes);
        console.log('PDF Created!');
    } catch (err) {
        console.log(err);
    }
}

createPdf('')