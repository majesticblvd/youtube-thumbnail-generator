import { createCanvas } from 'canvas';
// import fs from 'fs';

export async function generateTextBuffer({ text, fontSize, fontFamily, color, shadowColor = 'rgba(0,0,0,0.8)', shadowOffsetX = -1, shadowOffsetY = 3, shadowBlur = 3, letterSpacing }) {
    const lines = text.split('\n');
    const numLines = lines.length;
    
    const lineHeight = numLines > 1 ? 0.9 : 1;
    const lineSpacing = fontSize * lineHeight;

    let lineMaxWidth = 0;

    let tempCanvas = createCanvas(100, 100);
    let tempContext = tempCanvas.getContext('2d');
    tempContext.font = `${fontSize}px '${fontFamily}'`;

    lines.forEach(line => {
        let lineWidth = 0;
        for (let i = 0; i < line.length; i++) {
            const metrics = tempContext.measureText(line[i]);
            lineWidth += metrics.width + letterSpacing * (i ? 3 : 0); 
        }
        lineMaxWidth = Math.max(lineMaxWidth, lineWidth) + 307;
        console.log('maxLineWidth', lineMaxWidth);
    });

    const height = lineSpacing * lines.length;
    const extraWidth = 6;

    const canvas = createCanvas(lineMaxWidth + extraWidth, height);
    const context = canvas.getContext('2d');

    // Set up drop shadow
    context.shadowColor = shadowColor;
    context.shadowBlur = shadowBlur;
    context.shadowOffsetX = shadowOffsetX;
    context.shadowOffsetY = shadowOffsetY;

    context.font = `${fontSize}px '${fontFamily}'`;
    context.fillStyle = color;
    context.textBaseline = 'middle';
  
    lines.forEach((line, index) => {
        const yPos = (index + 0.5) * lineSpacing;
        let xPos = extraWidth;

        // Draw each letter individually with increased spacing
        for (let i = 0; i < line.length; i++) {
            context.fillText(line[i], xPos, yPos);
            xPos += context.measureText(line[i]).width + letterSpacing;
        }
    });
  
    const buffer = canvas.toBuffer('image/png');

    // fs.writeFileSync('test.png', buffer);

    return { buffer, height };
}
