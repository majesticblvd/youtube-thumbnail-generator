import { createCanvas } from 'canvas';

export async function generateTextBuffer({ text, fontSize, fontFamily, color, shadowColor = 'rgba(0,0,0,0.8)', shadowOffsetX = -1, shadowOffsetY = 3, shadowBlur = 3, letterSpacing, segment, isIconEnabled }) {
    const lineHeight = (fontSize * 1.2);
    console.log('lineHeight', lineHeight);
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
    
    // Create background canvas
    const bgPadding = 0; // padding around the text
    const extraWidth = segment.extraWidth || 10; // Use 0 as default if not specified
    const bgWidth = canvasWidth + extraWidth + 2 * bgPadding; // Add extra width to the background
    const bgHeight = height + bgPadding * 2;
    const bgX = -extraWidth / 2; // Center the extra width around the text
    const bgY = -bgPadding;
    
    const backgroundCanvas = createCanvas(bgWidth, bgHeight);
    const bgContext = backgroundCanvas.getContext('2d');

    // Color the background canvas for visualization
    // bgContext.fillStyle = 'rgba(255, 0, 0, 0.0)'; // Semi-transparent red
    // bgContext.fillRect(0, 0, bgWidth, bgHeight);

    // Draw background only for interview-short-b
    if (segment.id === 'access-interview-short-b') {
        bgContext.fillStyle = '#061414';
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
    context.clearRect(0, 0, bgWidth, bgHeight);

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
 
    wrappedLines.forEach((line, index) => {
        const yPos = index * (lineHeight - negLineGap) + padding - upwardShift; // this is the y position of the line. You can increase the lineHeight to increase the gap between the lines.
        context.fillText(line, (bgWidth - canvasWidth) / 2 + bgPadding + rightShift, yPos); // Adjust the x position to align text within the background
    });

    const buffer = mainCanvas.toBuffer('image/png');

    return { buffer, height };
}
