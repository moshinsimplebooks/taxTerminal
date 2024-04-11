import fs from 'fs'
import { fromPath, fromBase64, fromBuffer } from 'pdf2pic';

const options = {
    density: 100,
    saveFilename: "untitled",
    savePath: "./images",
    format: "png",
    width: 600,
    height: 600
};
const convert = fromPath('./pdf/Anjali_Kalubowila.pdf', options);
const pageToConvertAsImage = 1;
// Base64-encoded PDF data
const base64PDF = '...'; // Your base64-encoded PDF data goes here

// Decode base64 PDF data
const pdfData = Buffer.from(base64PDF, 'base64');

// Convert PDF to PNG image
convert(pageToConvertAsImage, { responseType: "image" })
    .then(result => {
        const pngData = fs.readFileSync(result.path); // Read the PNG file data

        // Convert PNG data to base64-encoded image
        const base64Image = Buffer.from(pngData).toString('base64');

        // Use the base64Image as needed
        console.log(base64Image);

        // Optionally, you can delete the converted PNG file
        fs.unlinkSync(result.path);
    }).catch(error => {
        console.error('Error:', error);
    });
