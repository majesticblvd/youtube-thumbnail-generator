import { createCanvas } from 'canvas';
import sharp from 'sharp';
// import fs from 'fs';

export async function generateTextBuffer({ text, fontSize, fontFamily, color, shadowColor = 'rgba(0,0,0,0.8)', shadowOffsetX = -1, shadowOffsetY = 3, shadowBlur = 3, letterSpacing, segment, isIconEnabled }) {
    const lineHeight = (fontSize * 1.2);
    console.log('lineHeight', lineHeight)
    let canvasWidth = segment.canvasWidth ? segment.canvasWidth : undefined;

    const tempCanvas = createCanvas(100, 100); 
    const tempContext = tempCanvas.getContext('2d');
    tempContext.font = `${fontSize}px '${fontFamily}'`;

    // Function to wrap text
    function wrapText(context, text, maxWidth) {
        let words = text.split(' '); // Split the text into words
        let lines = []; // Array to hold the lines
        let line = ''; // Variable to hold the current line

        words.forEach(word => {
            let testLine = line + word + ' '; // builds the lines one word at a time increasing the width with each word
            let metrics = context.measureText(testLine);
            let testWidth = metrics.width;

            if (testWidth > maxWidth && line !== '') {
                lines.push(line.trim());
                line = word + ' ';
            } else {
                line = testLine;
            }
        });

        lines.push(line.trim());
        return lines;
    }

    let wrappedLines = text.split('\n').reduce((acc, line) => {
        return [...acc, ...wrapText(tempContext, line, canvasWidth)];
    }, []);

    let lineMaxWidth = wrappedLines.reduce((maxWidth, line) => {
        let lineWidth = tempContext.measureText(line).width + 15;
        return Math.max(maxWidth, lineWidth);
    }, 0);

    // Adjust the canvas width if not specified
    if (!canvasWidth) {
        canvasWidth = lineMaxWidth; // Add some padding from the left
    }

    // Sets the top padding to fit the icon above the text
    let padding = 0;
    if (isIconEnabled) {
        if (segment.id === 'wayback-b') {
            padding = 0;
        } else {
            padding = 185;
        }
    }

    const height = (lineHeight * wrappedLines.length) + padding; // Calculate the height of the canvas
    const canvas = createCanvas(canvasWidth, height); 
    const context = canvas.getContext('2d');

    // Set up drop shadow
    context.shadowColor = shadowColor;
    context.shadowBlur = shadowBlur;
    context.shadowOffsetX = shadowOffsetX;
    context.shadowOffsetY = shadowOffsetY;

    context.font = `${fontSize}px '${fontFamily}'`;
    context.fillStyle = color;
    console.log('segment details', segment);
    if (segment.id === 'wayback-b') {
        context.textBaseline = 'top';
    } else {        
        context.textBaseline = 'top';
    }

    // Temporary background color for testing
    // context.fillStyle = 'rgba(255, 0, 0, 0.5)';
    // context.fillRect(0, 0, canvas.width, canvas.height);

    const negLineGap = segment.negLineGap || 35; // this is the gap between the lines. increase to move the lines closer together
    console.log('canvas', canvas.height)
    wrappedLines.forEach((line, index) => {
        const yPos = index * (lineHeight - negLineGap) + padding; // this is the y position of the line. You can increase the lineHeight to increase the gap between the lines.
        // console.log('yPos', yPos)
        // can increase the yPos to make the gap between the lines larger. But i will actually just need to move the whole canvas element itself lower.
        context.fillText(line, 0, yPos); // Add some padding from the left
    });

    const buffer = canvas.toBuffer('image/png');

    // fs.writeFileSync('test.png', buffer);

    return { buffer, height };
}
