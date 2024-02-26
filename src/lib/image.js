import { createCanvas } from 'canvas';
// import fs from 'fs';

export async function generateTextBuffer({ text, fontSize, fontFamily, color }) {
    const lines = text.split('\n');
    const numLines = lines.length;
    const lineHeight = numLines > 1 ? 1.1 : 1;

    let maxWidth = 0;

    let tempCanvas = createCanvas(100, 100);
    let tempContext = tempCanvas.getContext('2d');
    
    tempContext.font = `${fontSize}px '${fontFamily}'`;
  
    lines.forEach(line => {
        const metrics = tempContext.measureText(line);
        
        maxWidth = Math.max(maxWidth, metrics.width);
    });
    
    const lineSpacing = fontSize * lineHeight;
    const height = lineSpacing * lines.length;

    const canvas = createCanvas(maxWidth, height);
    const context = canvas.getContext('2d');

    context.font = `${fontSize}px '${fontFamily}'`;
    context.fillStyle = color;
    context.textBaseline = 'middle';
  
    lines.forEach((line, index) => {
        const yPos = (index + 0.5) * lineSpacing;

        context.fillText(line, 0, yPos);
    });

  
    const buffer = canvas.toBuffer('image/png');

    // fs.writeFileSync('test.png', buffer);

    return { buffer, height };
}