// ImageGallery.tsx
import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";

// Ваш власний тип Image
interface Image {
  id: string;
  urls: {
    small: string;
  };
  alt_description: string;
  user: {
    name: string;
  };
  views: number;
}

interface ImageGalleryProps {
  images: Image[];

}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, }) => {
  return (
    <ul className={styles.gallery}>
      {images.map((image) => (
        <ImageCard key={image.id} image={image}  />
      ))}
    </ul>
  );
};

export default ImageGallery;
