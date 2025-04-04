import { createCanvas } from 'canvas';

export async function generateTextBuffer({ text, fontSize, fontFamily, color, shadowColor = 'rgba(0,0,0,0.8)', shadowOffsetX = -1, shadowOffsetY = 3, shadowBlur = 3, letterSpacing = 0, segment, isIconEnabled, imageWidth, lineHeight, canvasWidth }) {
    
    const lineHeightCalc = (fontSize * lineHeight);

    let adjCanvasWidth = segment.canvasWidth ? canvasWidth : undefined;

    const tempCanvas = createCanvas(100, 100);
    const tempContext = tempCanvas.getContext('2d');
    tempContext.font = `${fontSize}px '${fontFamily}'`;

    // Function to wrap text
    function wrapText(context, text, maxWidth) {
        let words = text.split(' ');
        let lines = [];
        let line = '';
    
        words.forEach(word => {
            let testLine = line + word + ' ';
            let metrics = context.measureText(testLine);
            let testWidth = metrics.width + (testLine.length - 1) * letterSpacing;
    
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
        return [...acc, ...wrapText(tempContext, line, adjCanvasWidth)];
    }, []);
    
    // Calculate the maximum width of the wrapped lines
    let lineMaxWidth = wrappedLines.reduce((maxWidth, line) => {
        let lineWidth = tempContext.measureText(line).width + (line.length - 1) * letterSpacing + 15;
        return Math.max(maxWidth, lineWidth);
    }, 0);

    // Adjust the canvas width if not specified
    if (!adjCanvasWidth) {
        adjCanvasWidth = lineMaxWidth; // Add some padding from the left
    }

    if (segment.textCenter) {
        adjCanvasWidth = imageWidth - 50; // Set canvas width to image width if text is centered
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

    const height = (lineHeightCalc * wrappedLines.length) + padding; // Calculate the height of the canvas
    
    // Create background canvas
    const bgPadding = 0; // padding around the text
    const extraWidth = segment.extraWidth || 10; // Use 10 as default if not specified
    const bgWidth = adjCanvasWidth + extraWidth + 2 * bgPadding; // Add extra width to the background
    const bgHeight = height + bgPadding * 2; // Add padding to the height
    const bgX = -extraWidth / 2; // Center the extra width around the text
    const bgY = -bgPadding;
    
    const backgroundCanvas = createCanvas(bgWidth, bgHeight);
    const bgContext = backgroundCanvas.getContext('2d');

    // Add a temporary background color for debugging
    // bgContext.fillStyle = '#ff0000';
    // bgContext.fillRect(0, 0, bgWidth, bgHeight);


    // Draw background only for interview-short-b
    if (segment.dynamicBG) {
        if (segment.id === 'access-interview-short-b') {
            bgContext.fillStyle = '#061414';
        } else if (segment.id === 'access-olympics-interview') {
            bgContext.fillStyle = '#ffffff';
            color = '#073298';
        } else {
            bgContext.fillStyle = '#000000';
        }
        bgContext.beginPath();
        bgContext.moveTo(0, 0);
        bgContext.lineTo(bgWidth - bgHeight / 2, 0);
        bgContext.arc(bgWidth - bgHeight / 2, bgHeight / 2, bgHeight / 2, 1.5 * Math.PI, 0.5 * Math.PI);
        bgContext.lineTo(0, bgHeight);
        bgContext.closePath();
        bgContext.fill();
    }

    // Create main canvas with the correct dimensions
    const mainCanvas = createCanvas(bgWidth, bgHeight);
    const context = mainCanvas.getContext('2d', { alpha: true });

    // Color the main canvas for visualization
    // context.fillStyle = 'rgba(0, 0, 255, 0.5)'; // Semi-transparent blue

    // context.fillRect(0, 0, bgWidth, bgHeight); // Fill the entire canvas with the color for debugging
    // context.clearRect(0, 0, bgWidth, bgHeight);

    // Draw the background canvas onto the main canvas
    context.drawImage(backgroundCanvas, 0, 0);

    // Set up drop shadow for text
    context.shadowColor = shadowColor;
    context.shadowBlur = shadowBlur;
    context.shadowOffsetX = shadowOffsetX;
    context.shadowOffsetY = shadowOffsetY;

    context.font = `${fontSize}px '${fontFamily}'`;
    context.fillStyle = color;
    context.textBaseline = 'top';
    

    const negLineGap = segment.negLineGap || 35; // this is the gap between the lines. increase to move the lines closer together
    const rightShift = segment.rightShift || 0; // Use 0 as default if not specified
    const upwardShift = segment.upwardShift || 0; // Use 0 as default if not specified
 
    wrappedLines.forEach((line, lineIndex) => {
        let xPos;
        if (segment.textCenter) {
            // Calculate the width of the current line
            const lineWidth = context.measureText(line).width + (line.length - 1) * letterSpacing;

            // Check if the line is too long
            if (lineWidth > 1720) {
                throw new Error('Text too long, decrease font size or word count');
            }

            // Center the line horizontally
            xPos = (bgWidth - lineWidth) / 2;
        } else {
            xPos = (bgWidth - adjCanvasWidth) / 2 + bgPadding + rightShift;
        }
        
        // Calculate the y position of the line based on the line index
        const yPos = lineIndex * (lineHeightCalc - negLineGap) + padding - upwardShift;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            context.fillText(char, xPos, yPos);
            xPos += context.measureText(char).width + letterSpacing;
        }
    });

    const buffer = mainCanvas.toBuffer('image/png');

    return { buffer, height };
}
