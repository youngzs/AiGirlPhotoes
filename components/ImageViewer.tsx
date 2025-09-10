
import React, { useState, useEffect } from 'react';

interface ImageViewerProps {
  images: string[];
  startIndex: number;
  onClose: () => void;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({ images, startIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  const goToPrevious = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="relative w-full h-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-white text-5xl font-bold z-50 hover:text-gray-300">&times;</button>

        {images.length > 1 && (
          <>
            <button onClick={goToPrevious} className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-3 text-3xl hover:bg-opacity-75 z-50">
              &#10094;
            </button>
            <button onClick={goToNext} className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-3 text-3xl hover:bg-opacity-75 z-50">
              &#10095;
            </button>
          </>
        )}
        
        <div className="relative w-auto h-5/6">
            <img src={images[currentIndex]} alt={`View ${currentIndex + 1}`} className="max-w-full max-h-full object-contain rounded-lg"/>
        </div>

        {images.length > 1 && (
            <div className="absolute bottom-4 text-white text-lg">
                {currentIndex + 1} / {images.length}
            </div>
        )}
      </div>
    </div>
  );
};
