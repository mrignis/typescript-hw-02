import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";

// Ваш власний тип Image
interface MyImage {
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
  images: MyImage[]; // Використовуємо нове ім'я
  onImageClick: (image: MyImage) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onImageClick }) => {
  return (
    <ul className={styles.gallery}>
      {images.map((image) => (
        <ImageCard key={image.id} image={image} onImageClick={onImageClick} />
      ))}
    </ul>
  );
};

export default ImageGallery;
