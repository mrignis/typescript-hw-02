import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";
import { Image } from "../ImageCard/ImageCard"; // додайте імпорт типу Image

interface ImageGalleryProps {
  images: Image[];
  onImageClick: (image: Image) => void;
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
