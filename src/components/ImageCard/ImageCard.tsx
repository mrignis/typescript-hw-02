import React from "react";
import styles from "./ImageCard.module.css";

type Image = {
  urls: {
    small: string;
  };
  alt_description: string;
  user: {
    name: string;
  };
  views: number;
};

type ImageCardProps = {
  image: Image;
  onImageClick: (image: Image) => void;
};

const ImageCard: React.FC<ImageCardProps> = ({ image, onImageClick }) => {
  const handleClick = () => {
    onImageClick(image);
  };

  return (
    <li className={styles.card}>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        className={styles.image}
        onClick={handleClick}
      />
      <div className={styles.overlay}>
        <div className={styles.overlayContent}>
          <h3 className={styles.title}>{image.user.name}</h3>
          <p className={styles.views}>{image.views} views</p>
        </div>
      </div>
    </li>
  );
};

export default ImageCard;

