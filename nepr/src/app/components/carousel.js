'use client';

import Image from "next/image";
import { useState } from "react";

const Carousel = ({ multimedia }) => {
  multimedia = multimedia.filter(x => x != null && x.startsWith("https"));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    if (currentImageIndex < multimedia.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const currentImage = multimedia[currentImageIndex];

  return (
    <div className="relative my-6 max-w-full h-auto rounded-lg mx-auto">
      <div className="relative">
        <div className="w-full h-[400px] flex justify-center items-center overflow-hidden rounded-lg">
          {currentImage && (
            <img
              src={currentImage}
              alt="carousel"
              className="object-contain max-w-full max-h-full"
            />
          )}
        </div>

        {/* Previous Button */}
        {currentImageIndex > 0 && (
          <div
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 cursor-pointer z-10"
            onClick={prevImage}
          >
            &lt;
          </div>
        )}

        {/* Next Button */}
        {currentImageIndex < multimedia.length - 1 && (
          <div
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 cursor-pointer z-10"
            onClick={nextImage}
          >
            &gt;
          </div>
        )}
      </div>
    </div>
  );
};

export default Carousel;
