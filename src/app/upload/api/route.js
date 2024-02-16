import sharp from 'sharp';

// export const runtime = 'edge';
 
export async function GET(req) {
    return new Response( 'hello world' )
}



const segmentToPngMap = {
    'Access Standard': '/pngs/E.png',
    'Access Royals': '/pngs/G.png',
    'Access Interview (short)': '/pngs/I.png',
    'Access Interview (long)': '/pngs/E.png',
    'Access Exclusive': '/pngs/E.png',
    // Add more mappings as needed
};


export async function POST(req, res) {
    const { text, file, segment } = await req.json();

    // decode the base64 string
    const base64String = file.split(';base64,').pop();
    const buffer = Buffer.from(base64String, 'base64');

    // use sharp to process the image
    try {

        // Select the PNG overlay based on the segment
        const overlayPng = segmentToPngMap[segment] || '/pngs/E.png'; 

        // Create the text overlay
        const svgText = generateTextSVG(text);

        const processedImage = await sharp(buffer)
            .composite([
                { input: overlayPng, blend: 'over', top: -40, left: 0},
                { input: Buffer.from(svgText), blend: 'over', top: 760, left: 240},
            ])
            .toFormat('webp')
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

function generateTextSVG(text) {
    return `
        <svg width="1000" height="400">
            <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" 
            style="font-size: 148px; fill: white; font-family: Arial; font-style: italic; font-weight: bold;">
                ${text}
            </text>
        </svg>
    `;
}

async function createTextOverlay(text, width, height) {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);

    ctx.font = 'bold 40pt Menlo';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText(text, width / 2, height / 2);

    return canvas.toBuffer('image/png');
}




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
