import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";
import { Image as CardImage } from "../ImageCard/ImageCard"; // змінено ім'я імпортованої змінної Image

interface ImageGalleryProps {
  images: CardImage[]; // використовуємо нове ім'я типу
  onImageClick: (image: CardImage) => void;
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
