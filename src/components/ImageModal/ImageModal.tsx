import React from "react";
import Modal from "react-modal";

import styles from "./ImageModal.module.css";

type Image = {
  urls: {
    regular?: string;
  };
  alt_description?: string;
};

type ImageModalProps = {
  isOpen: boolean;
  image: Image | null;
  onClose: () => void;
};

Modal.setAppElement("#root");

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, image, onClose }) => {
  if (!image) {
    return null;
  }

  const imageUrl = image.urls?.regular;
  const altDescription = image.alt_description || "Image";

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <img src={imageUrl} alt={altDescription} />
      <button onClick={onClose}>Close</button>
    </Modal>
  );
};

export default ImageModal;
