import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

export async function GET(req) {
    return new Response( 'hello world' )
}

const publicDirectory = path.join(process.cwd(), 'public');

const segmentToPngMap = {
    'Access Standard': '/pngs/standard.png',
    'Access Royals': '/pngs/royals.png',
    'Access Interview (short)': '/pngs/int-short.png',
    'Access Interview (long)': '/pngs/int-long.png',
    'Access Exclusive': '/pngs/E.png',
    'Access Daily': '/pngs/daily.png',
    'Access Award Season': '/pngs/award.png',
    'Access Reality Nightcap': '/pngs/night.png',
    'Access Housewives Nightcap': '/pngs/housewives.png',
};

// Allow the user to use special characters in the text (&, <, >, ", ')
function encodeHtmlEntities(text) {
    return text.replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;')
               .replace(/"/g, '&quot;')
               .replace(/'/g, '&#039;');
}

export async function POST(req, res) {
    const { text, file, segment, secondText, fontSize, svgOne } = await req.json();

    // Font Path retrieval 
    const fontPath = path.join(publicDirectory, '/fonts/MarkOT-CondBoldItalic.otf');
    const fontBase64 = fs.readFileSync(fontPath).toString('base64');

    // decode the base64 string
    const base64String = file.split(';base64,').pop();
    const buffer = Buffer.from(base64String, 'base64');

    // Client SVG
    const svgBase64String = svgOne.split(';base64,').pop();
    const svgBuffer = Buffer.from(svgBase64String, 'base64');

    // use sharp to process the image
    try {

        // Select the PNG overlay based on the segment
        // const overlayPng = segmentToPngMap[segment] || '/pngs/E.png'; 
        const overlayPngPath = path.join(publicDirectory, segmentToPngMap[segment] || '/pngs/E.png');

        // Set dynamic positions for the text overlay 
        let firstYPos = 790;
        let secondPos = 840;
        let xPos = 240;

        if (secondText) {
            firstYPos = 690; // Move up the first text
            xPos = 300; // Adjust the first text accordingly
            secondPos = 820; // Adjust the second text accordingly
        } else {
            firstYPos = 790; // Move up the first text
            xPos = 240; // Adjust the first text accordingly
        }

        // Create the text overlay
        const svgText = generateTextSVGTwo(text, fontSize, fontBase64);
        const secondSvgText = generateTextSVGTwo(secondText, fontSize, fontBase64);

        const processedImage = await sharp(buffer)
            .resize(1920, 1080, {
                fit: 'cover',
                position: 'center',
            })
            .composite([
                { input: overlayPngPath, blend: 'over', top: 0, left: 0},
                { input: svgBuffer, blend: 'over', top: firstYPos, left: xPos},
                { input: Buffer.from(svgText), blend: 'over', top: firstYPos, left: xPos}, 
                { input: Buffer.from(secondSvgText), blend: 'over', top: secondPos, left: xPos},
            ])
            .toFormat('jpeg')
            .jpeg({ quality: 70 })
            .toBuffer();

        // convert the buffer to base64 to send back to the client
        const base64Image = `data:image/webp;base64,${processedImage.toString('base64')}`;

        // send the base64 image back to the client
        return Response.json({ base64Image });
    } catch (error) {
        console.error('Error:', error);
        return Response.json({ error: error.message });
    }
}

function generateTextSVG(text, fontSize) {
    const encodedText = encodeHtmlEntities(text.toUpperCase());
    return `
        <svg width="1500" height="400">
            <text x="3%" y="50%" dominant-baseline="middle" text-anchor="left" 
            style="font-size: ${fontSize}px; fill: white; font-family: 'Mark OT Cond Bold Italic'; font-style: italic; font-weight: bold; letter-spacing: 0; stroke: white; stroke-width: 1.5px;">
                ${encodedText}
            </text>
        </svg>
    `;
}

function generateTextSVGTwo(text, fontSize, fontBase64) {
    const encodedText = encodeHtmlEntities(text.toUpperCase());
    return `
        <svg width="1500" height="400" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <style type="text/css">
                <![CDATA[
                    @font-face {
                        font-family: 'Mark OT Cond Bold Italic';
                        src: url(data:font/opentype;base64,${fontBase64});
                    }
                    text {
                        font-family: 'Mark OT Cond Bold Italic';
                    }
                ]]>
                </style>
            </defs>
            <text x="3%" y="50%" dominant-baseline="middle" text-anchor="left" 
            style="font-size: ${fontSize}px; fill: white; font-family: 'Mark OT Cond Bold Italic'; font-style: italic; font-weight: bold; letter-spacing: 0; stroke: white;">
                ${encodedText}
            </text>
        </svg>
    `;
}

// async function createTextOverlay(text, width, height) {
//     const canvas = createCanvas(width, height);
//     const ctx = canvas.getContext('2d');

//     ctx.fillStyle = 'white';
//     ctx.fillRect(0, 0, width, height);

//     ctx.font = 'bold 40pt Menlo';
//     ctx.fillStyle = 'black';
//     ctx.textAlign = 'center';
//     ctx.fillText(text, width / 2, height / 2);

//     return canvas.toBuffer('image/png');
// }

// Other way of adding text (cannot make white though yet)
// TEXT Overlay
// const textOverlay = {
//     text: {
//         text: svgText, // Text to render
//         font: "Arial", // Specify font name
//         width: 1000, // Width to wrap text
//         dpi: 800,
//         rgba: true, // Set true if you need RGBA (for colored text or emoji)
//         spacing: 12, // Adjust line spacing
//     }
// };
// { input: textOverlay, blend: 'over', top: 870, left: 300,  }
