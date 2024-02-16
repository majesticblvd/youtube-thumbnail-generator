import sharp from 'sharp';

// export const runtime = 'edge';
 
export async function GET(req) {
    return new Response( 'hello world' )
}


const segmentToPngMap = {
    'Access Standard': './public/pngs/E.png',
    'Access Royals': './public/pngs/G.png',
    'Access Interview (short)': './public/pngs/I.png',
    'Access Interview (long)': './public/pngs/E.png',
    'Access Exclusive': './public/pngs/E.png',
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
        const overlayPng = segmentToPngMap[segment] || './public/pngs/E.png'; 

        const processedImage = await sharp(buffer)
            .composite([{ input: overlayPng, gravity: 'southeast', text: 'howdy' }])
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