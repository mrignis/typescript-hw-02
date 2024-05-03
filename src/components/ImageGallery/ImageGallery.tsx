import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";
import { Image } from "../temple";

type ImageGalleryProps = {
  images: Image[];
  onImageClick: (image: Image) => void;
};

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onImageClick }) => {
  // Перевірка наявності images перед використанням
  if (!images || images.length === 0) {
    return  <ul className={styles.gallery}>
    {images.map((image) => (
      <ImageCard key={image.id} image={image} onImageClick={onImageClick} />
    ))}
  </ul>
  } 
};

export default ImageGallery;
