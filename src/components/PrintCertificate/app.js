// Import dependencies
import { createWriteStream } from "fs";
import moment from "moment";
import PDFDocument from "pdfkit";


export const getCertificate = ({ name, theme }) => {



    // Create the PDF document
    const doc = new PDFDocument({
        layout: "landscape",
        size: "A4",
    });

    // The name


    // Pipe the PDF into an name.pdf file
    doc.pipe(createWriteStream(`${name}.pdf`));

    // Draw the certificate image
    doc.image("images/certificate.png", 0, 0, { width: 842 });

    // Remember to download the font
    // Set the font to Dancing Script
    //doc.font("fonts/DancingScript-VariableFont_wght.ttf");

    // Draw the name
    doc.fontSize(60).text(`${name}--- ${theme}`, 20, 265, {
        align: "center"
    });

    // Draw the date
    doc.fontSize(17).text(moment().format("MMMM Do YYYY"), -275, 430, {
        align: "center"
    });

    // Finalize the PDF and end the stream
    doc.end();






}


