import { createCanvas } from 'canvas';
// import fs from 'fs';

export async function generateTextBuffer({ text, fontSize, fontFamily, color }) {
    const lines = text.split('\n');
    const numLines = lines.length;
    
    const lineHeight = numLines > 1 ? 0.9 : 1;
    const lineSpacing = fontSize * lineHeight;

    let lineMaxWidth = 0;

    let tempCanvas = createCanvas(100, 100);
    let tempContext = tempCanvas.getContext('2d');
    
    tempContext.font = `${fontSize}px '${fontFamily}'`;
  
    lines.forEach(line => {
        const metrics = tempContext.measureText(line);
        
        lineMaxWidth = Math.max(lineMaxWidth, metrics.width);
    });

    const height = lineSpacing * lines.length;
    const extraWidth = 6;

    const canvas = createCanvas(lineMaxWidth + extraWidth, height);
    const context = canvas.getContext('2d');

    context.font = `${fontSize}px '${fontFamily}'`;
    context.fillStyle = color;
    context.textBaseline = 'middle';
  
    lines.forEach((line, index) => {
        const xPos = extraWidth; // Offset the extra width to the right (otherwise gets cut off at the start)
        const yPos = (index + 0.5) * lineSpacing;

        context.fillText(line, xPos, yPos);
    });
  
    const buffer = canvas.toBuffer('image/png');

    // fs.writeFileSync('test.png', buffer);

    return { buffer, height };
}