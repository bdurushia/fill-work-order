const { PDFDocument } = require('pdf-lib');
const { inquirer } = require('inquirer');
const { readFile, writeFile } = require('fs/promises');
// const { fs } = require('fs');
// const workOrderForm = require('./form/work-order-form.pdf');

async function createPdf(input, output) {
    try {
        const pdfDoc = await PDFDocument.load(await readFile(input));

        // Modify doc, fill out the form...
        const fieldNames = pdfDoc
            .getForm()
            .getFields()
            .map((f) => f.getName());
        console.log({ fieldNames });

        const form = pdfDoc.getForm();
        
        const pdfBytes = await pdfDoc.save();

        await writeFile(output, pdfBytes);
        console.log('PDF Created!');
    } catch (err) {
        console.log(err);
    }
}

createPdf('./forms/work-order-form.pdf', './forms/output.pdf');