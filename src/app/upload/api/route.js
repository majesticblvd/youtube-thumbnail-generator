import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { registerFont } from 'canvas';
import { generateTextBuffer } from '@/lib/image';
import brands from '@/config/brands';
import config from '@/config';
import { formatSize } from '@/lib/file';



export async function POST(req) {
    try {
        const { brandId, segmentId, text, file, secondText, fontSize, xPosition, yPosition, letterSpacing } = await req.json();
        
        const brand = brands.find((brand) => brand.id === brandId);

        if (!brand) {
            throw new Error('Brand not found');
        }

        const segment = brand.segments.find((segment) => segment.id === segmentId);

        if (!segment) {
            throw new Error('Segment not found');
        }

        if (!file) {
            throw new Error('No file provided');
        }

        const publicDirectory = path.join(process.cwd(), 'public');
        const fontPath = path.join(publicDirectory, '/fonts/MarkOT-CondBoldItalic.otf');
        const heavyFontPath = path.join(publicDirectory, '/fonts/MarkOT-Heavy.otf');

        registerFont(fontPath, { family: 'MarkOT-CondBoldItalic' });
        registerFont(heavyFontPath, { family: 'MarkOT-CondHeavy'});

        // Use Heavy Font if segment is interview (long)
        let fontFam = ''
        if (segmentId == 'access-interview-long') {
            fontFam = 'MarkOT-CondHeavy'
        } else {
            fontFam = 'MarkOT-CondBoldItalic'
        }

        const textColor = 'white';
        const processedImageSize = { width: 1920, height: 1080 };

        // decode the base64 string
        const base64String = file.split(';base64,').pop();
        const buffer = Buffer.from(base64String, 'base64');

        // Select the PNG overlay based on the segment
        const overlayPngPath = segment.image || '/pngs/E.png';
        const overlayPngFullPath = path.join(publicDirectory, overlayPngPath);

        if (!fs.existsSync(overlayPngFullPath)) {
            throw new Error('Overlay PNG not found');
        }

        // Format text
        const formattedText = `${text}${secondText ? `\n${secondText}` : ''}`.toUpperCase();

        // Convert letter spacing to int
        const letterSpacingInt = parseInt(letterSpacing); 

        // Create text
        const { buffer: textBuffer, height: textBufferHeight } = await generateTextBuffer({ text: formattedText, fontSize, fontFamily: fontFam, color: textColor, letterSpacing: letterSpacingInt });

        // Get the dimensions of the text buffer
        const textImage = sharp(textBuffer);
        const textMetadata = await textImage.metadata();

        // Check if text buffer is larger than the processed image size
        if (textMetadata.width > processedImageSize.width || textMetadata.height > processedImageSize.height) {
            throw new Error('Text too long, decrease font size or word count');
        }

        const textTargetPositionTopRatio = yPosition || config.defaultTextTargetPositionTopRatio;  
       
        const textXPos = parseInt(xPosition) || 350;
        const textYPos = parseInt((processedImageSize.height * textTargetPositionTopRatio) - (textBufferHeight / 2));
        
        const composites = [
            { input: overlayPngFullPath, blend: 'over', top: 0, left: 0},
            { input: textBuffer, blend: 'over', top: textYPos, left: textXPos},
        ];

        const processedImage = await sharp(buffer)
            .resize(processedImageSize.width, processedImageSize.height, {
                fit: 'cover',
                position: 'center',
            })
            .composite(composites)
            .toFormat('jpeg')
            .jpeg({ quality: 85 })
            .toBuffer();
        
        const processedImageSizeInBytes = processedImage.length;

        // convert the buffer to base64 to send back to the client
        const base64Image = `data:image/jpeg;base64,${processedImage.toString('base64')}`;

        console.log(`Generated image (Text 1: ${text} | Text 2: ${secondText || '-'} | Size: ${formatSize({ bytes: processedImageSizeInBytes, decimals: 1 })})`);

        // send the base64 image back to the client
        return Response.json({ base64Image, size: processedImageSizeInBytes });
    } catch (error) {
        console.error('Error:', error);

        return Response.json({ error: error.message });
    }
}