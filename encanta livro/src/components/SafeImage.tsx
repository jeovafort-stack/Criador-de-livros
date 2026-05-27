import React, { useState, useEffect } from "react";
import { IMAGE_FALLBACKS } from "../data";

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({ src, alt, className, ...props }) => {
  const [currentSrc, setCurrentSrc] = useState(src);

  // Synchronize state if the parent updates the source prop
  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  const handleError = () => {
    const fallback = IMAGE_FALLBACKS[src] || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80";
    if (currentSrc !== fallback) {
      setCurrentSrc(fallback);
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      onError={handleError}
      className={className}
      referrerPolicy="no-referrer"
      {...props}
    />
  );
};
