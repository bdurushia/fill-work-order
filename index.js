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
        
        const possibleFields = Array.from({ length: 21}, (_, i) => i);
        possibleFields.forEach((possibleField) => {
            try {
                form
                .getTextField(`Text${possibleField}`)
                .setText(possibleField.toString());
            } catch (err) {
                console.log(err);
            }
        });
        
        form.getTextField('jobName').setText('Umass Amherst');
        form.getCheckBox('equipmentInUseYes').check();

        const pdfBytes = await pdfDoc.save();

        await writeFile(output, pdfBytes);
        console.log('PDF Created!');
    } catch (err) {
        console.log(err);
    }
}

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'jobName',
            message: 'Job name: '
        }
    ]).then(jobNameInput => {
        return console.log(jobNameInput);
    });
}

promptUser();

createPdf('./forms/work-order-form.pdf', './forms/output.pdf');