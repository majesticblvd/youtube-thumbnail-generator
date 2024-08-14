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
        const { brandId, segmentId, text, file, secondText, fontSize, xPosition, yPosition, letterSpacing, isGradientSelected, isIconEnabled, filter } = await req.json();
        
        const brand = brands.find((brand) => brand.id === brandId);

        console.log('gradient state', isGradientSelected);

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
        const wilkosHeavyFontPath = path.join(publicDirectory, '/fonts/TradeGothicHeavy.ttf');
        const karamoFontPath = path.join(publicDirectory, '/fonts/Mont-BlackItalic.otf');

        registerFont(fontPath, { family: 'MarkOT-CondBoldItalic' });
        registerFont(heavyFontPath, { family: 'MarkOT-CondHeavy'});
        registerFont(wilkosHeavyFontPath, { family: 'TradeGothicHeavy'});
        registerFont(karamoFontPath, { family: 'Mont-BlackItalic'});

        // Use Heavy Font if segment is interview (long)
        let fontFam = ''
        if (segmentId == 'access-interview-long') {
            fontFam = 'MarkOT-CondHeavy'
        }  else if (segmentId == 'wayback-a') {
            fontFam = 'TradeGothicHeavy'
        } else if (segmentId == 'wayback-b') {
            fontFam = 'TradeGothicHeavy'
        } else if (segmentId == 'new-a') {
            fontFam = 'TradeGothicHeavy'
        } else if (segmentId == 'new-b') {
            fontFam = 'TradeGothicHeavy'
        } else if (segmentId === 'standard-a') {
            fontFam = 'Mont-BlackItalic'
        } else if (segmentId === 'standard-b') {
            fontFam = 'Mont-BlackItalic'
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

        // Gradient Png Path
        const gradientPngPath = '/pngs/gradient-norm.png'
        const gradientPngFullPath = path.join(publicDirectory, gradientPngPath);

        if (!fs.existsSync(overlayPngFullPath)) {
            throw new Error('Overlay PNG not found');
        }

        let composites = [];
        if (text && !segment.pngOverlay) {
            // Format text
            const formattedText = `${text}${secondText ? `\n${secondText}` : ''}`.toUpperCase();
            
            // Convert letter spacing to int
            const letterSpacingInt = parseInt(letterSpacing); 
            
            // Create text
            const { buffer: textBuffer, height: textBufferHeight } = await generateTextBuffer({ text: formattedText, fontSize, fontFamily: fontFam, color: textColor, letterSpacing: letterSpacingInt, segment, isIconEnabled });
            
            // Get the dimensions of the text buffer
            const textImage = sharp(textBuffer);
            const textMetadata = await textImage.metadata();
            console.log('textMetadata', textMetadata);
            
            // Check if text buffer is larger than the processed image size
            if (textMetadata.width > processedImageSize.width || textMetadata.height > processedImageSize.height) {
                throw new Error('Text too long, decrease font size or word count');
            }
            
            const textTargetPositionTopRatio = yPosition || config.defaultTextTargetPositionTopRatio;  
            
            const textXPos = parseInt(xPosition) || 350;
            const textYPos = parseInt(processedImageSize.height * textTargetPositionTopRatio); // this will use the top left corner of the text as the reference point
            
            composites = [
                { input: overlayPngFullPath, blend: 'over', top: 0, left: 0},
                { input: textBuffer, blend: 'over', top: textYPos, left: textXPos},
            ];
        } else if (text && segment.pngOverlay) {

            // Format text
            const formattedText = `${text}${secondText ? `\n${secondText}` : ''}`.toUpperCase();
            
            // Convert letter spacing to int
            const letterSpacingInt = parseInt(letterSpacing); 
            
            // Create text
            const { buffer: textBuffer, height: textBufferHeight } = await generateTextBuffer({ text: formattedText, fontSize, fontFamily: fontFam, color: textColor, letterSpacing: letterSpacingInt, segment, isIconEnabled });
            
            // Get the dimensions of the text buffer
            const textImage = sharp(textBuffer);
            const textMetadata = await textImage.metadata();
            console.log('textMetadata', textMetadata);
            
            // Check if text buffer is larger than the processed image size
            if (textMetadata.width > processedImageSize.width || textMetadata.height > processedImageSize.height) {
                throw new Error('Text too long, decrease font size or word count');
            }
            
            const textTargetPositionTopRatio = yPosition || config.defaultTextTargetPositionTopRatio;  
            
            const textXPos = parseInt(xPosition) || 350;
            const textYPos = parseInt(processedImageSize.height * textTargetPositionTopRatio); // this will use the top left corner of the text as the reference point

            composites = [
                { input: textBuffer, blend: 'over', top: textYPos, left: textXPos},
                { input: overlayPngFullPath, blend: 'over', top: 0, left: 0},
            ];
        } else {

            composites = [
                { input: overlayPngFullPath, blend: 'over', top: 0, left: 0},
            ];
        }

        if (isGradientSelected) {
            composites.unshift({ input: gradientPngFullPath, blend: 'over', top: 0, left: 0});
        }

        if (isIconEnabled) {
            const iconPngPath = segment.icon || '/pngs/SW_Side_Element_Live.png';
            const iconPngFullPath = path.join(publicDirectory, iconPngPath);
            composites.push({ input: iconPngFullPath, blend: 'over', top: 30, left: 30});
        }

        let sharpInstance = sharp(buffer) // create a sharp instance with the buffer
            .resize(processedImageSize.width, processedImageSize.height, {
                fit: 'cover',
                position: 'center',
            }); // resize the image to fit the processed image size

        switch (filter) {
            case 'sepia':
                sharpInstance = sharpInstance.modulate({ brightness: 1, saturation: 0.7, hue: 30 });
                break;
            case 'grayscale':
                sharpInstance = sharpInstance.grayscale();
                break;
            case 'blur':
                sharpInstance = sharpInstance.blur(5);
                break;
            case 'sharpen':
                sharpInstance = sharpInstance.sharpen(5);
                break;
            case 'brighten':
                sharpInstance = sharpInstance.modulate({ brightness: 1.3 });
                break;
        }

        const processedImage = await sharpInstance
            .composite(composites)
            .toFormat('jpeg')
            .jpeg({ quality: 85 })
            .toBuffer();

        // const processedImage = await sharp(buffer)
        //     .resize(processedImageSize.width, processedImageSize.height, {
        //         fit: 'cover',
        //         position: 'center',
        //     })
        //     .composite(composites)
        //     .toFormat('jpeg')
        //     .jpeg({ quality: 85 })
        //     .toBuffer();
        
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