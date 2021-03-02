import React, { PureComponent } from 'react'
import { Button } from 'reactstrap'
import PDFDocument from "pdfkit";
import moment from "moment";
import certificate from '../../assets/certificate.png';


export default class GenerateCertif extends PureComponent {

    certif(name, theme) {
        const doc = new PDFDocument({
            layout: "landscape",
            size: "A4",
        });
        // doc.pipe(createWriteStream(`${name}.pdf`));
        doc.image({ certificate }, 0, 0, { width: 842 });


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

    render() {
        return <Button>Download Certificate</Button>
    }


}