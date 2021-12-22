// import React, { useState } from 'react';
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
// import OverlayThumbnail from './OverlayThumbnail';
import OverlayCarousel from './OverlayCarousel';

function ImageGallery(props) {
  const { productStyleSelected, expanded, handleExpand } = props;

  // For tracking the main image
  const [mainPicUrl, setMainPicUrl] = useState(productStyleSelected.photos[0].url);
  const [currIndex, setCurrIndex] = useState(0);

  // Thumbnail carousel can have a max of 7 thumbnails. Initialize with (up to) first 7 thumbnails.
  const [startIndex, setStartIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(7);
  const [currCarouselView, setCurrCarouselView] = useState(productStyleSelected.photos.slice(0, 7));

  // On render we'll immediately calculate whether or not the carousel up/down arrows should show
  const [showUpArrow, setShowUpArrow] = useState(true);
  const [showDownArrow, setShowDownArrow] = useState(true);

  const [imageExpandedCursorClass, setImageExpandedCursorClass] = useState('right-arrow-toggle-next-enabled');

  // Save a reference to last cursor position so we can transition smoothly between images.
  const refCursorXPercentPosition = useRef();
  const refCursorYPercentPosition = useRef();

  // On thumbnail click, set main image to thumbnail's image and current index to thumbnail's index
  const selectMainPic = (overlayThumbnail) => {
    setMainPicUrl(overlayThumbnail.url);
    for (let j = 0; j < productStyleSelected.photos.length; j += 1) {
      if (productStyleSelected.photos[j].url === overlayThumbnail.url) {
        setCurrIndex(j);
        break;
      }
    }
  };


  // Updates thumbnail carousel with the correct thumbnails and up/down arrows to display.
  const updateThumbnailCarousel = () => {
    const currentDisplay = productStyleSelected.photos.slice(startIndex, lastIndex);

    if (productStyleSelected.photos.length <= 7) {
      setShowDownArrow(false);
      setShowUpArrow(false);
    } else {
      if (lastIndex !== productStyleSelected.photos.length) {
        setShowDownArrow(true);
      } else {
        setShowDownArrow(false);
      }

      if (startIndex !== 0) {
        setShowUpArrow(true);
      } else {
        setShowUpArrow(false);
      }
    }
    setCurrCarouselView(currentDisplay);
  };

  // Helper functions to automatically scroll thumbnails up/down depending on the index
  const handleScrollUp = () => {
    if (startIndex !== 0) {
      setStartIndex((prevState) => prevState - 1);
      setLastIndex((prevState) => prevState - 1);
      updateThumbnailCarousel();
    }
  };

  const handleScrollDown = () => {
    if (lastIndex < productStyleSelected.photos.length) {
      setStartIndex((prevState) => prevState + 1);
      setLastIndex((prevState) => prevState + 1);
      updateThumbnailCarousel();
    }
  };

  // To show next picture, up the current index and our hook will handle the render
  const showNextPic = () => {
    if (currIndex < productStyleSelected.photos.length - 1) {
      setCurrIndex((prevState) => prevState + 1);
    }
  };

  // To show previous picture, lower the current index and our hook will handle the render
  const showPrevPic = () => {
    if (currIndex > 0) {
      setCurrIndex((prevState) => prevState - 1);
    }
  };

  // Update thumbnail carousel view if needed
  const scrollWithPic = (index) => {
    if (index === startIndex) {
      handleScrollUp();
    } else if (index === lastIndex - 1) {
      handleScrollDown();
    }
  };

  // When showing next/previous pictures, also update the thumbnail carousel if needed
  const showNextPicAndScroll = () => {
    showNextPic();
    scrollWithPic(currIndex);
  };

  const showPrevPicAndScroll = () => {
    showPrevPic();
    scrollWithPic(currIndex);
  };



  // Anytime the start/last index changes, update carousel. (Technically already taken care of)
  useEffect(() => {
    updateThumbnailCarousel();
  }, [startIndex, lastIndex]);

  // Every time a new style is selected, reset main image, current index and thumbnail carousel
  useEffect(() => {
    setMainPicUrl(productStyleSelected.photos[0].url);
    setCurrIndex(0);
    setStartIndex(0);
    setLastIndex(7);
    updateThumbnailCarousel();
  }, [productStyleSelected]);

  // Every time the index changes, update main image to the image at that index
  useEffect(() => {
    setMainPicUrl(productStyleSelected.photos[currIndex].url);
    // We also want to change cursor whenever index changes, not just on movement.
    calcAndSetImageExpandedCursorClass();
  }, [productStyleSelected, currIndex]);




  const imageGalleryId = expanded ? 'image-gallery-expanded' : 'image-gallery';
  // const imageMainId = expanded ? 'image-main-expanded' : 'image-main';

  return (
    <div id={imageGalleryId}>

      <OverlayCarousel
        productStyleSelected={productStyleSelected}
        mainPicUrl={mainPicUrl}
        selectMainPic={selectMainPic}
        currIndex={currIndex}
        currCarouselView={currCarouselView}
        expanded={expanded}
        showUpArrow={showUpArrow}
        showDownArrow={showDownArrow}
        handleScrollUp={handleScrollUp}
        handleScrollDown={handleScrollDown}
        showNextPicAndScroll={showNextPicAndScroll}
        showPrevPicAndScroll={showPrevPicAndScroll}
        imageExpandedCursorClass={imageExpandedCursorClass}
      />
    </div>
  );
}

ImageGallery.propTypes = {
  productStyleSelected: PropTypes.instanceOf(Object).isRequired,
  expanded: PropTypes.bool.isRequired,
  handleExpand: PropTypes.func.isRequired,
};

export default ImageGallery;
