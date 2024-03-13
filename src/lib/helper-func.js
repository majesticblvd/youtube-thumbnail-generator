




// Function to reset the image to default
export const resetToDefault = (selectedSegment, { setFontSize, setXPosition, setYPosition, setLetterSpacing, setImageWidth, setImageHeight }) => {
  if (selectedSegment) {
    setFontSize(selectedSegment.fontSize);
    setXPosition(selectedSegment.textXPosition);
    setYPosition(selectedSegment.textTargetPositionTopRatio);
    setLetterSpacing(selectedSegment.letterSpacing)
  }
  setImageWidth(400);
  setImageHeight(200);
}