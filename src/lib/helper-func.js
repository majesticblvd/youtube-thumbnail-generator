


// Function to reset the image to default
export const resetToDefault = (selectedSegment, { setFontSize, setXPosition, setYPosition, setLetterSpacing }) => {
  if (selectedSegment) {
    setFontSize(selectedSegment.fontSize);
    setXPosition(selectedSegment.textXPosition);
    setYPosition(selectedSegment.textTargetPositionTopRatio);
    setLetterSpacing(selectedSegment.letterSpacing)
  }
}

import config from '@/config';

export const resetStates = (brand, setters) => {
  const {
    setSelectedSegment,
    setText,
    setSecondText,
    setFontSize,
    setXPosition,
    setYPosition,
    setLetterSpacing,
    setButtonActive,
    setMinYPosition,
    setMaxYPosition,
    setMinXPosition,
    setMaxXPosition,
    setImageUrl,
    setCroppedImageUrl,
    setOriginalImageUrl,
    setIsCropped,
    setYoutubeUrl,
    setCropStart,
    setCropEnd
  } = setters;

  // Reset segment and related states
  setSelectedSegment('');
  setText('');
  setSecondText('');
  setFontSize(config.defaultFontSize);
  setXPosition(350);
  setYPosition(config.defaultTextTargetPositionTopRatio);
  setLetterSpacing(config.defaultLetterSpacing);
  setButtonActive('normal');
  
  // Reset position limits
  setMinYPosition(brand.minYPosition || null);
  setMaxYPosition(brand.maxYPosition || null);
  setMinXPosition(brand.minXPosition || null);
  setMaxXPosition(brand.maxXPosition || null);

  // Reset image-related states
  setImageUrl('');
  setCroppedImageUrl('');
  setOriginalImageUrl('');
  setIsCropped(false);
  
  // Reset YouTube URL
  setYoutubeUrl('');
  
  // Reset crop states
  setCropStart({ x: 0, y: 0 });
  setCropEnd({ x: 0, y: 0 });
};

